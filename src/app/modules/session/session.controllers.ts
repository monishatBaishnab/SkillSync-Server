import httpStatus from "http-status";
import send_response from "../../utils/send_response";
import catch_async from "../../utils/catch_async";

// Controller for fetch all sessions
const fetch_all = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for fetch all sessions by user id
const fetch_by_user = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for fetch single session
const fetch_single = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for create one session
const create_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for update one session
const update_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for delete one session
const delete_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

export const session_controllers = {
  fetch_all,
  fetch_by_user,
  fetch_single,
  create_one,
  update_one,
  delete_one,
};
