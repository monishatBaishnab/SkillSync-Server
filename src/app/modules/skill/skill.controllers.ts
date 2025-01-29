import httpStatus from "http-status";
import send_response from "../../utils/send_response";
import catch_async from "../../utils/catch_async";
import { skill_services } from "./skill.services";

// Controller for fetch all skills
const fetch_all = catch_async(async (req, res) => {
  const result = await skill_services.fetch_all_from_db(req.query);
  send_response(res, {
    status: httpStatus.OK,
    message: "Skills fetched successfully.",
    data: result,
  });
});

// Controller for fetch all skills by user is
const fetch_by_user = catch_async(async (req, res) => {
  const result = await skill_services.fetch_all_by_user_from_db(
    req.query,
    req.user
  );
  send_response(res, {
    status: httpStatus.OK,
    message: "Skills fetched successfully based on user id.",
    data: result,
  });
});

// Controller for fetch single skill
const fetch_single = catch_async(async (req, res) => {
  const result = await skill_services.fetch_single_from_db(req.params.id);

  send_response(res, {
    status: httpStatus.OK,
    message: "Skill fetched successfully.",
    data: result,
  });
});

// Controller for create one skill
const create_one = catch_async(async (req, res) => {
  const result = await skill_services.create_one_in_db(
    req.body,
    req.file,
    req.user
  );

  send_response(res, {
    status: httpStatus.CREATED,
    message: "Skill created successfully.",
    data: result,
  });
});

// Controller for update one skill
const update_one = catch_async(async (req, res) => {
  const result = await skill_services.update_one_from_db(
    req.body,
    req.file,
    req.params.id
  );

  send_response(res, {
    status: httpStatus.OK,
    message: "Skill updated successfully.",
    data: result,
  });
});

// Controller for delete one skill
const delete_one = catch_async(async (req, res) => {
  await skill_services.delete_one_from_db(req.params.id);

  send_response(res, {
    status: httpStatus.OK,
    message: "Skill deleted successfully.",
  });
});

export const skill_controllers = {
  fetch_all,
  fetch_by_user,
  fetch_single,
  create_one,
  update_one,
  delete_one,
};
