import httpStatus from "http-status";
import send_response from "../../utils/send_response";
import catch_async from "../../utils/catch_async";

// Controller for fetch all skills
const fetch_all = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for fetch all skills by user is
const fetch_by_user = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for fetch single skill
const fetch_single = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for create one skill
const create_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for update one skill
const update_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for delete one skill
const delete_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
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
