import httpStatus from "http-status";
import send_response from "../../utils/send_response";
import catch_async from "../../utils/catch_async";
import { session_services } from "./session.services";

// Controller for fetch all sessions by user id
const fetch_all = catch_async(async (req, res) => {
  const result = await session_services.fetch_all_from_db(req.query);
  send_response(res, {
    status: httpStatus.OK,
    message: "Sessions fetched successfully.",
    data: result,
  });
});

// Controller for create one session
const create_one = catch_async(async (req, res) => {
  const result = await session_services.create_one_in_db(req.body);
  send_response(res, {
    status: httpStatus.CREATED,
    message: "Session created successfully.",
    data: result,
  });
});

// Controller for update one session
const update_one = catch_async(async (req, res) => {
  const result = await session_services.update_one_from_db(
    req.body,
    req.params.id
  );
  send_response(res, {
    status: httpStatus.OK,
    message: "Session updated successfully.",
    data: result,
  });
});

// Controller for delete one session
const delete_one = catch_async(async (req, res) => {
  await session_services.delete_one_from_db(req.params.id);

  send_response(res, {
    status: httpStatus.OK,
    message: "Session deleted successfully.",
  });
});

export const session_controllers = {
  fetch_all,
  create_one,
  update_one,
  delete_one,
};
