import { Session, Skill } from "@prisma/client";

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
const create_one_in_db = async (payload: Session) => {
  return {};
};
const update_one_from_db = async (payload: Partial<Session>, session_id) => {
  return {};
};
const delete_one_from_db = async (session_id) => {
  return {};
};

export const session_services = {
  fetch_all_from_db,
  fetch_all_by_user_from_db,
  fetch_single_from_db,
  create_one_in_db,
  update_one_from_db,
  delete_one_from_db,
};
