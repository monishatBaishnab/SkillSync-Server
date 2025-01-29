import { Router } from "express";
import { skill_controllers } from "./skill.controllers";

// Create router instance
const router = Router();

// Route for fetch all skills
router.get("/", skill_controllers.fetch_all);

// Route for fetch skills by user id
router.get("/user/:id", skill_controllers.fetch_by_user);

// Route for fetch single skill
router.get("/:id", skill_controllers.fetch_single);

// Route for create one skill
router.post("/", skill_controllers.create_one);

// Route for update one skill
router.put("/:id", skill_controllers.update_one);

// Route for delete one skill
router.delete("/:id", skill_controllers.delete_one);

export const skill_routes = router;
