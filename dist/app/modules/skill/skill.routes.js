"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skill_routes = void 0;
const express_1 = require("express");
const skill_controllers_1 = require("./skill.controllers");
// Create router instance
const router = (0, express_1.Router)();
// Route for fetch all skills
router.get("/", skill_controllers_1.skill_controllers.fetch_all);
// Route for fetch skills by user id
router.get("/user/:id", skill_controllers_1.skill_controllers.fetch_by_user);
// Route for fetch single skill
router.get("/:id", skill_controllers_1.skill_controllers.fetch_single);
// Route for create one skill
router.post("/", skill_controllers_1.skill_controllers.create_one);
// Route for update one skill
router.put("/:id", skill_controllers_1.skill_controllers.update_one);
// Route for delete one skill
router.delete("/:id", skill_controllers_1.skill_controllers.delete_one);
exports.skill_routes = router;
