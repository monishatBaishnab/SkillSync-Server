import { Router } from "express";
import { skill_controllers } from "./skill.controllers";
import { multer_up } from "../../middlewares/upload";
import parse_json from "../../middlewares/parse_json";
import validate_body from "../../utils/validate_body";
import { skill_schemas } from "./skill.shcemas";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "@prisma/client";

// Create router instance
const router = Router();

// Route for fetch all skills
router.get("/", skill_controllers.fetch_all);

// Route for fetch skills by user id
router.get(
  "/user",
  auth(USER_ROLE.ADMIN, USER_ROLE.TEACHER),
  skill_controllers.fetch_by_user
);

// Route for fetch single skill
router.get("/:id", skill_controllers.fetch_single);

// Route for create one skill
router.post(
  "/",
  auth(USER_ROLE.TEACHER, USER_ROLE.ADMIN),
  multer_up.single("file"),
  parse_json,
  validate_body(skill_schemas.create),
  skill_controllers.create_one
);

// Route for update one skill
router.put(
  "/:id",
  auth(USER_ROLE.TEACHER, USER_ROLE.ADMIN),
  multer_up.single("file"),
  parse_json,
  validate_body(skill_schemas.update),
  skill_controllers.update_one
);

// Route for delete one skill
router.delete(
  "/:id",
  auth(USER_ROLE.TEACHER, USER_ROLE.ADMIN),
  skill_controllers.delete_one
);

export const skill_routes = router;
