"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skill_schemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({ message: "Skill Name Required." }).max(255),
    description: zod_1.z.string({ message: "Skill Description Required." }),
    category: zod_1.z.string({ message: "Skill Category Required." }).max(255),
});
const update = zod_1.z.object({
    name: zod_1.z.string().max(255).optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.string().max(255).optional(),
});
exports.skill_schemas = {
    create,
    update,
};
