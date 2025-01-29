import { z } from "zod";

const create = z.object({
  name: z.string({ message: "User Name Required." }).max(255),
  email: z.string({ message: "User Email Required." }).email().max(100),
  password: z.string({ message: "User Password Required." }),
  role: z.enum(["LEARNER", "TEACHER", "ADMIN"]).default("LEARNER"),
});

const update = z.object({
  name: z.string().max(255).optional(),
  email: z.string().email().max(100).optional(),
  password: z.string().optional(),
  role: z.enum(["LEARNER", "TEACHER", "ADMIN"]).default("LEARNER").optional(),
});

const login = z.object({
  email: z.string({ message: "User Email Required." }).email().max(100),
  password: z.string({ message: "User Password Required." }),
});

export const auth_schemas = {
  create,
  update,
  login
};
