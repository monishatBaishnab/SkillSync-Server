import { z } from "zod";

const create = z.object({
  name: z.string({ message: "Skill Name Required." }).max(255),
  description: z.string({ message: "Skill Description Required." }),
  category: z.string({ message: "Skill Category Required." }).max(255),
});

const update = z.object({
  name: z.string().max(255).optional(),
  description: z.string().optional(),
  category: z.string().max(255).optional(),
});

export const skill_schemas = {
  create,
  update,
};
