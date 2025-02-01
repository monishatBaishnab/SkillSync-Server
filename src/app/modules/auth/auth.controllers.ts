import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { auth_services } from "./auth.services";

// Controller for login
const login = catch_async(async (req, res) => {
  const result = await auth_services.login_user(req.body);
  send_response(res, {
    status: httpStatus.OK,
    message: "Login Successful.",
    data: result
  });
});
// Controller for register
const register = catch_async(async (req, res) => {
  const result = await auth_services.register_user(req.body);
  send_response(res, {
    status: httpStatus.OK,
    message: "Register Successful.",
    data: result
  });
});
// Controller for update profile
const update_one = catch_async(async (req, res) => {
  const result = await auth_services.update_one(req.body, req.params.id);
  send_response(res, {
    status: httpStatus.OK,
    message: "Profile update successfully..",
    data: result
  });
});

export const auth_controllers = {
  login,
  register,
  update_one
};
