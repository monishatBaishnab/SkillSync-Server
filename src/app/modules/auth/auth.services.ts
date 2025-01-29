import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { generate_token } from "../../utils/jwt_handlers";
import { local_config } from "../../config";
import http_error from "../../errors/http_error";
import httpStatus from "http-status";

// Service function for login user
const login_user = async (payload: { email: string; password: string }) => {
  const user_info = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const verify_password = bcrypt.compareSync(
    payload.password,
    user_info.password
  );
  if (!verify_password) {
    throw new http_error(httpStatus.BAD_REQUEST, "Password Not Match.");
  }
  const token = generate_token(user_info, local_config.jwt_secret as string);

  return { token };
};

// Service function for register user
const register_user = async (payload: User) => {
  const user_data = { ...payload };

  const hashed_password = bcrypt.hashSync(payload.password, 11);
  user_data.password = hashed_password;

  const created_user = await prisma.user.create({
    data: user_data,
  });

  const token = generate_token(created_user, local_config.jwt_secret as string);

  return { token };
};

export const auth_services = {
  login_user,
  register_user,
};
