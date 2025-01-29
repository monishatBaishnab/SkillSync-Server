import { z } from "zod";

const create = z.object({
  skill_id: z.string({ message: "Skill ID Required." }),
  teacher_id: z.string({ message: "Teacher ID Required." }),
  learner_id: z.string({ message: "Learner ID Required." }),
  session_date: z.string({ message: "Session Date Required." }),
  start_time: z.string({ message: "Session Start Time Required." }),
  end_time: z.string({ message: "Session End Time Required." }),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).default("SCHEDULED"),
});

const update = z.object({
  skill_id: z.string().optional(),
  teacher_id: z.string().optional(),
  learner_id: z.string().optional(),
  session_date: z.date().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  status: z
    .enum(["SCHEDULED", "COMPLETED", "CANCELLED"])
    .default("SCHEDULED")
    .optional(),
});

export const session_schemas = {
  create,
  update,
};
