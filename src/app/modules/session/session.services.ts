import { Session } from "@prisma/client";
import prisma from "../../utils/prisma";
import wc_builder from "../../utils/wc_builder";
import sanitize_paginate from "../../utils/sanitize_paginate";

/**
 * Fetch all sessions from the database with pagination, filtering, and sorting.
 * @param query - Query parameters for filtering, pagination, and sorting.
 * @returns A list of sessions with metadata (pagination details).
 */
const fetch_all_from_db = async (query: Record<string, unknown>) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);

  // Build filtering conditions based on query parameters (e.g., filtering by 'name')
  const whereConditions = wc_builder(query, ["name"], ["name"]);

  // Fetch sessions with applied filters, pagination, sorting, and nested data
  const sessions = await prisma.session.findMany({
    where: {
      AND: [
        { AND: whereConditions },
        { teacher_id: query?.teacher_id as string },
      ],
    },
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  // Count total sessions matching the query (ignoring pagination)
  const total = await prisma.session.count({
    where: {
      AND: [
        { AND: whereConditions },
        { teacher_id: query?.teacher_id as string },
      ],
    },
  });

  return { sessions, meta: { page, limit, total } };
};

/**
 * Creates multiple session slots in the database.
 * @param session_payload - The session details, including optional duration.
 * @returns The newly created session record.
 */
const create_one_in_db = async (session_payload: Session) => {
  const created_session = await prisma.session.create({
    data: session_payload,
  });

  return created_session;
};

/**
 * Update an existing session by ID.
 * @param payload - Partial session data to update.
 * @param session_id - The ID of the session to update.
 * @returns The updated session.
 */
const update_one_from_db = async (
  payload: Partial<Session>,
  session_id: string
) => {
  // Ensure the session exists before attempting to update
  await prisma.session.findUniqueOrThrow({
    where: { id: session_id },
  });

  // Update session data in the database
  const updated_session = await prisma.session.update({
    data: payload,
    where: { id: session_id },
  });

  return updated_session;
};

/**
 * Soft delete a session by setting `isDeleted` to false.
 * @param session_id - The ID of the session to delete.
 * @returns The updated session marked as deleted.
 */
const delete_one_from_db = async (session_id: string) => {
  // Ensure the session exists before attempting to delete
  await prisma.session.findUniqueOrThrow({
    where: { id: session_id },
  });

  // Update session status instead of completely removing it from the database
  const deleted_session = await prisma.session.update({
    data: { isDeleted: false },
    where: { id: session_id },
  });

  return deleted_session;
};

// Export session service functions for use in other parts of the application
export const session_services = {
  fetch_all_from_db,
  create_one_in_db,
  update_one_from_db,
  delete_one_from_db,
};
