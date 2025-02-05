import { Skill } from "@prisma/client";
import { TFile } from "../../types";
import { cloudinary_uploader } from "../../middlewares/upload";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../utils/prisma";
import wc_builder from "../../utils/wc_builder";
import sanitize_paginate from "../../utils/sanitize_paginate";

/**
 * Fetch all skills from the database with pagination, filtering, and sorting.
 * @param query - Query parameters for filtering, pagination, and sorting.
 * @returns A list of skills with metadata (pagination details).
 */
const fetch_all_from_db = async (query: Record<string, unknown>) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);

  // Build filtering conditions based on query parameters (e.g., filtering by 'name' or 'category')
  const whereConditions = wc_builder(
    query,
    ["name"],
    ["user_id", "name", "category"],
  );

  // Fetch skills with applied filters, pagination, and sorting
  const skills = await prisma.skill.findMany({
    where: { AND: [{ AND: whereConditions }] },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      Availability: {
        select: {
          id: true,
          status: true,
        },
      },
      Session: {
        include: { learner: { select: { id: true, name: true } } },
      },
    },
  });

  // Count total skills matching the query (ignoring pagination)
  const total = await prisma.skill.count({
    where: { AND: [{ AND: whereConditions }] },
  });

  return { skills, meta: { page, limit, total } };
};

/**
 * Fetch all skills belonging to a specific user.
 * @param query - Query parameters for filtering, pagination, and sorting.
 * @param user - The authenticated user's JWT payload.
 * @returns A list of skills associated with the user.
 */
const fetch_all_by_user_from_db = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);

  // Build filtering conditions based on query parameters (e.g., filtering by 'name' or 'category')
  const whereConditions = wc_builder(query, ["name"], ["name", "category"]);

  // Fetch skills that belong to the user with applied filters
  const skills = await prisma.skill.findMany({
    where: { AND: [{ AND: whereConditions }, { user_id: user.id }] },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  // Count total skills matching the query for the specific user
  const total = await prisma.skill.count({
    where: { AND: [{ AND: whereConditions }, { user_id: user.id }] },
  });

  return { skills, meta: { page, limit, total } };
};

/**
 * Fetch a single skill by its ID.
 * @param skill_id - The ID of the skill to retrieve.
 * @returns The skill object if found.
 */
const fetch_single_from_db = async (skill_id: string) => {
  const skill = await prisma.skill.findUnique({
    where: { id: skill_id },
  });

  return skill;
};

/**
 * Create a new skill in the database.
 * @param payload - Skill data to be stored.
 * @param file - Uploaded file (image) for the skill.
 * @param user - The authenticated user's JWT payload.
 * @returns The newly created skill.
 */
const create_one_in_db = async (
  payload: Skill,
  file: TFile,
  user: JwtPayload,
) => {
  const skill_data: Skill = { ...payload, user_id: user.id };

  // Upload image to Cloudinary and set the image URL in skill data
  const uploaded_image_info = await cloudinary_uploader(file);
  if (uploaded_image_info?.secure_url) {
    skill_data.image = uploaded_image_info.secure_url;
  }

  // Create a new skill record in the database
  const created_skill = await prisma.skill.create({
    data: skill_data,
  });

  return created_skill;
};

/**
 * Update an existing skill by ID.
 * @param payload - Partial skill data to update.
 * @param file - Uploaded file (image) for the skill.
 * @param skill_id - The ID of the skill to update.
 * @returns The updated skill.
 */
const update_one_from_db = async (
  payload: Partial<Skill>,
  file: TFile,
  skill_id: string,
) => {
  const skill_data: Partial<Skill> = { ...payload };

  // Upload image to Cloudinary and set the image URL in skill data
  const uploaded_image_info = await cloudinary_uploader(file);
  if (uploaded_image_info?.secure_url) {
    skill_data.image = uploaded_image_info.secure_url;
  }

  // Update the skill record in the database
  const updated_skill = await prisma.skill.update({
    data: skill_data,
    where: { id: skill_id },
  });

  return updated_skill;
};

/**
 * Soft delete a skill by setting `isDeleted` to true.
 * @param skill_id - The ID of the skill to delete.
 * @returns An empty object after marking the skill as deleted.
 */
const delete_one_from_db = async (skill_id: string) => {
  await prisma.skill.update({
    data: { isDeleted: true },
    where: { id: skill_id },
  });

  return {};
};

// Export skill service functions for use in other parts of the application
export const skill_services = {
  fetch_all_from_db,
  fetch_all_by_user_from_db,
  fetch_single_from_db,
  create_one_in_db,
  update_one_from_db,
  delete_one_from_db,
};
