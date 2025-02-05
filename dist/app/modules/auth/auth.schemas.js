"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_schemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({ message: "User Name Required." }).max(255),
    email: zod_1.z.string({ message: "User Email Required." }).email().max(100),
    password: zod_1.z.string({ message: "User Password Required." }),
    role: zod_1.z.enum(["LEARNER", "TEACHER", "ADMIN"]).default("LEARNER"),
});
const update = zod_1.z.object({
    name: zod_1.z.string().max(255).optional(),
    email: zod_1.z.string().email().max(100).optional(),
    password: zod_1.z.string().optional(),
    role: zod_1.z.enum(["LEARNER", "TEACHER", "ADMIN"]).default("LEARNER").optional(),
});
const login = zod_1.z.object({
    email: zod_1.z.string({ message: "User Email Required." }).email().max(100),
    password: zod_1.z.string({ message: "User Password Required." }),
});
const fetch_available_teachers = zod_1.z.object({
    email: zod_1.z.string({ message: "User Email Required." }).email().max(100),
    password: zod_1.z.string({ message: "User Password Required." }),
});
exports.auth_schemas = {
    create,
    update,
    login
};
