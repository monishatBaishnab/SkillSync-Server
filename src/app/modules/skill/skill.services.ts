import { Skill } from "@prisma/client";

const fetch_all_from_db = async (query: Record<string, unknown>) => {
  return {};
};
const fetch_all_by_user_from_db = async (
  query: Record<string, unknown>,
  user
) => {
  return {};
};
const fetch_single_from_db = async (query: Record<string, unknown>) => {
  return {};
};
const create_one_in_db = async (payload: Skill) => {
  return {};
};
const update_one_from_db = async (payload: Partial<Skill>, skill_id) => {
  return {};
};
const delete_one_from_db = async (skill_id) => {
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
