import { Availability } from "@prisma/client";
import prisma from "../../utils/prisma";
import sanitize_paginate from "../../utils/sanitize_paginate";
import { NOT_FOUND, CONFLICT } from "http-status";
import http_error from "../../errors/http_error";
import { create_time_slot } from "../../utils/create_time_slot";
import { date_validator } from "../../utils/date_validator";
import wc_builder from "../../utils/wc_builder";

/**
 * Fetch all availabilities from the database with pagination, sorting, and applied filters.
 * @param query - The query parameters for pagination, sorting, and filters.
 * @returns An object containing the list of availabilities and pagination metadata.
 */
const fetch_all_from_db = async (query: Record<string, unknown>) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);
  const whereConditions = wc_builder(
    query,
    ["date"],
    ["date", "teacher_id", "skill_id"],
  );

  // Fetch availabilities that belong to the user with applied filters
  const availabilities = await prisma.availability.findMany({
    where: { AND: whereConditions },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      skill: {
        select: {
          name: true,
        },
      },
      teacher: {
        select: {
          name: true,
        },
      },
    },
  });
  // Count total availabilities matching the query for the specific user
  const total = await prisma.availability.count({
    where: { AND: whereConditions },
  });

  return { availabilities, meta: { page, limit, total } };
};

/**
 * Create new availability sessions in the database based on the given session data.
 * It validates session dates, checks for overlapping sessions, and generates time slots.
 * @param session_payload - The data for the new availability session.
 * @returns An array of created availability session slots.
 */
const create_one_in_db = async (
  session_payload: Availability & { duration?: string },
) => {
  // Fetch skill details associated with the session
  const skill_details = await prisma.skill.findUniqueOrThrow({
    where: { id: session_payload.skill_id },
  });

  // Check for existing sessions on the same date and skill
  const existing_sessions = await prisma.availability.findMany({
    where: {
      date: session_payload.date,
      skill_id: session_payload.skill_id,
    },
  });

  // Validate session date
  const is_date_valid = date_validator(session_payload.date);
  if (!is_date_valid) {
    throw new http_error(
      NOT_FOUND,
      "The date is invalid. It cannot be a past date.",
    );
  }

  // Ensure that the skill exists
  if (!skill_details) {
    throw new http_error(NOT_FOUND, "Skill not found.");
  }

  // Helper function to convert 12-hour format to 24-hour format
  const to24HourFormat = (timeString: string) => {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}`;
  };

  existing_sessions.forEach((existing_session) => {
    // Convert the time strings to 24-hour format if necessary
    const existing_start_time = to24HourFormat(existing_session.start_time);
    const new_start_time = to24HourFormat(session_payload.start_time);
    const existing_end_time = to24HourFormat(existing_session.end_time);
    const new_end_time = to24HourFormat(session_payload.end_time);

    // Create the full ISO date string for comparison (using a fixed date of 1970-01-01)
    const existing_start = new Date(
      `1970-01-01T${existing_start_time}:00.000Z`,
    );
    const new_start = new Date(`1970-01-01T${new_start_time}:00.000Z`);
    const existing_end = new Date(`1970-01-01T${existing_end_time}:00.000Z`);
    const new_end = new Date(`1970-01-01T${new_end_time}:00.000Z`);

    // Check for overlapping sessions
    if (existing_start < new_end && existing_end > new_start) {
      throw new http_error(CONFLICT, "Slot overlaps with an existing session.");
    }
  });

  // Generate time slots based on duration
  const slots: Availability[] = [];
  const time_slots = create_time_slot(
    session_payload.start_time,
    session_payload.end_time,
    Number(session_payload.duration),
  );

  delete session_payload.duration;

  // Create a new availability slot for each generated time slot
  time_slots.forEach(({ startTime, endTime }) => {
    slots.push({
      ...session_payload,
      start_time: startTime,
      end_time: endTime,
    });
  });

  // Insert the generated availability slots into the database
  const created_availabilities = await prisma.availability.createMany({
    data: slots,
  });

  return created_availabilities;
};

// Export availability service functions for use in other parts of the application
export const availability_services = {
  fetch_all_from_db,
  create_one_in_db,
};
