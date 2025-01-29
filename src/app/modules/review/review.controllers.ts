import httpStatus from "http-status";
import send_response from "../../utils/send_response";
import catch_async from "../../utils/catch_async";
import { review_services } from "./review.services";

// Controller for fetch all reviews
const fetch_all = catch_async(async (req, res) => {
  const result = await review_services.fetch_all_from_db(req.query);

  send_response(res, {
    status: httpStatus.OK,
    message: "Reviews fetched successfully.",
    data: result,
  });
});

// Controller for create one review
const create_one = catch_async(async (req, res) => {
  const result = await review_services.create_one_in_db(req.body);

  send_response(res, {
    status: httpStatus.CREATED,
    message: "Review created successfully.",
    data: result,
  });
});

// Controller for update one review
const update_one = catch_async(async (req, res) => {
  await review_services.update_one_from_db(req.body, req.params.id);

  send_response(res, {
    status: httpStatus.OK,
    message: "Review deleted successfully.",
  });
});

export const review_controllers = {
  fetch_all,
  create_one,
  update_one,
};
