import { Skill } from "@prisma/client";
import { TFile } from "../../types";
import { cloudinary_uploader } from "../../middlewares/upload";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../utils/prisma";
import wc_builder from "../../utils/wc_builder";
import sanitize_paginate from "../../utils/sanitize_paginate";

const fetch_all_from_db = async (query: Record<string, unknown>) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);

  // Build where conditions based on the query (e.g., filtering by 'name')
  const whereConditions = wc_builder(query, ["name"], ["name", "category"]);

  // Fetch products with conditions, pagination, sorting, and nested data
  const skills = await prisma.skill.findMany({
    where: {
      AND: [{ AND: whereConditions }],
    },
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  // Count total products matching the query (ignores pagination)
  const total = await prisma.skill.count({
    where: {
      AND: [{ AND: whereConditions }],
    },
  });

  return { skills, meta: { page, limit, total } };
};
const fetch_all_by_user_from_db = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);

  // Build where conditions based on the query (e.g., filtering by 'name')
  const whereConditions = wc_builder(query, ["name"], ["name", "category"]);

  // Fetch products with conditions, pagination, sorting, and nested data
  const skills = await prisma.skill.findMany({
    where: {
      AND: [{ AND: whereConditions }, { user_id: user.id }],
    },
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  // Count total products matching the query (ignores pagination)
  const total = await prisma.skill.count({
    where: {
      AND: [{ AND: whereConditions }, { user_id: user.id }],
    },
  });

  return { skills, meta: { page, limit, total } };
};

const fetch_single_from_db = async (skill_id: string) => {
  const skill = await prisma.skill.findUnique({
    where: { id: skill_id },
  });

  return skill;
};

const create_one_in_db = async (
  payload: Skill,
  file: TFile,
  user: JwtPayload
) => {
  const skill_data: Skill = { ...payload, user_id: user.id };

  // Upload image in cloudinary and set the image link in user data
  const uploaded_image_info = await cloudinary_uploader(file);
  if (uploaded_image_info?.secure_url) {
    skill_data.image = uploaded_image_info.secure_url;
  }

  const created_skill = await prisma.skill.create({
    data: skill_data,
  });

  return created_skill;
};
const update_one_from_db = async (
  payload: Partial<Skill>,
  file: TFile,
  skill_id: string
) => {
  const skill_data: Partial<Skill> = { ...payload };

  // Upload image in cloudinary and set the image link in user data
  const uploaded_image_info = await cloudinary_uploader(file);
  if (uploaded_image_info?.secure_url) {
    skill_data.image = uploaded_image_info.secure_url;
  }

  const updated_skill = await prisma.skill.update({
    data: skill_data,
    where: { id: skill_id },
  });

  return updated_skill;
};
const delete_one_from_db = async (skill_id: string) => {
  await prisma.skill.update({
    data: { isDeleted: true },
    where: { id: skill_id },
  });
  return {};
};

export const skill_services = {
  fetch_all_from_db,
  fetch_all_by_user_from_db,
  fetch_single_from_db,
  create_one_in_db,
  update_one_from_db,
  delete_one_from_db,
};
