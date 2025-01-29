import httpStatus from "http-status";
import send_response from "../../utils/send_response";
import catch_async from "../../utils/catch_async";

// Controller for fetch all reviews
const fetch_all = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});


// Controller for fetch single review
const fetch_single = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for create one review
const create_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for update one review
const update_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

// Controller for delete one review
const delete_one = catch_async(async (req, res) => {
  send_response(res, {
    status: httpStatus.OK,
    message: "",
  });
});

export const review_controllers = {
  fetch_all,
  fetch_single,
  create_one,
  update_one,
  delete_one,
};
