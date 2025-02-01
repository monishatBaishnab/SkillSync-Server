import { Review, Skill } from "@prisma/client";
import prisma from "../../utils/prisma";
import sanitize_paginate from "../../utils/sanitize_paginate";

const fetch_all_from_db = async (query: Record<string, unknown>) => {
  // Sanitize query parameters for pagination and sorting
  const { page, limit, skip, sortBy, sortOrder } = sanitize_paginate(query);

  // Fetch reviews that belong to the user with applied filters
  const reviews = await prisma.review.findMany({
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  // Count total reviews matching the query for the specific user
  const total = await prisma.review.count({});

  return { reviews, meta: { page, limit, total } };
};

const create_one_in_db = async (payload: Review) => {
  const created_review = await prisma.review.create({
    data: { ...payload, rating: String(payload?.rating) },
  });

  return created_review;
};

const update_one_from_db = async (
  payload: Partial<Skill>,
  review_id: string,
) => {
  await prisma.review.findUniqueOrThrow({
    where: { id: review_id },
  });

  const updated_review = await prisma.review.update({
    data: payload,
    where: { id: review_id },
  });

  return updated_review;
};

export const review_services = {
  fetch_all_from_db,
  create_one_in_db,
  update_one_from_db,
};
