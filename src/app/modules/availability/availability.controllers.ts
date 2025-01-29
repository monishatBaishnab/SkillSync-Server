import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { availability_services } from "./availability.services";

const fetch_all = catch_async(async (req, res) => {
  const result = await availability_services.fetch_all_from_db(req.query);

  send_response(res, {
    status: httpStatus.OK,
    message: "Availabilities fetched successfully.",
    data: result
  });
});
const create_one = catch_async(async (req, res) => {
  const result = await availability_services.create_one_in_db(req.body);

  send_response(res, {
    status: httpStatus.OK,
    message: "Availability created successfully.",
    data: result,
  });
});

export const availability_controllers = {
  fetch_all,
  create_one,
};
