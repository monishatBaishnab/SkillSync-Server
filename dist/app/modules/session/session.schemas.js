"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session_schemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    skill_id: zod_1.z.string({ message: "Skill ID Required." }),
    teacher_id: zod_1.z.string({ message: "Teacher ID Required." }),
    learner_id: zod_1.z.string({ message: "Learner ID Required." }),
    session_date: zod_1.z.string({ message: "Session Date Required." }),
    start_time: zod_1.z.string({ message: "Session Start Time Required." }),
    end_time: zod_1.z.string({ message: "Session End Time Required." }),
    status: zod_1.z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).default("SCHEDULED"),
});
const update = zod_1.z.object({
    skill_id: zod_1.z.string().optional(),
    teacher_id: zod_1.z.string().optional(),
    learner_id: zod_1.z.string().optional(),
    session_date: zod_1.z.date().optional(),
    start_time: zod_1.z.string().optional(),
    end_time: zod_1.z.string().optional(),
    status: zod_1.z
        .enum(["SCHEDULED", "COMPLETED", "CANCELLED"])
        .default("SCHEDULED")
        .optional(),
});
exports.session_schemas = {
    create,
    update,
};
