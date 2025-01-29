import { User, USER_ROLE } from "@prisma/client";
import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

// Define the structure of the token payload
export type TTokenData = {
  id: string;
  email: string;
  role: USER_ROLE;
};

// Function to generate a JSON Web Token (JWT) using the provided payload and secret
export const generate_token = (payload: User, secret: Secret) => {
  const tokenData = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
  };
  const token = jwt.sign(tokenData, secret, { expiresIn: "5d" });
  return token;
};

// Function to verify the provided token and extract the payload data
export const verify_token = (token: string, secret: Secret): TTokenData => {
  const verified_user = jwt.verify(token, secret);
  return verified_user as TTokenData;
};
