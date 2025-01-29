"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skill_routes = void 0;
const express_1 = require("express");
const skill_controllers_1 = require("./skill.controllers");
const upload_1 = require("../../middlewares/upload");
const parse_json_1 = __importDefault(require("../../middlewares/parse_json"));
const validate_body_1 = __importDefault(require("../../utils/validate_body"));
const skill_shcemas_1 = require("./skill.shcemas");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
// Create router instance
const router = (0, express_1.Router)();
// Route for fetch all skills
router.get("/", skill_controllers_1.skill_controllers.fetch_all);
// Route for fetch skills by user id
router.get("/user", (0, auth_1.default)(client_1.USER_ROLE.ADMIN, client_1.USER_ROLE.TEACHER), skill_controllers_1.skill_controllers.fetch_by_user);
// Route for fetch single skill
router.get("/:id", skill_controllers_1.skill_controllers.fetch_single);
// Route for create one skill
router.post("/", (0, auth_1.default)(client_1.USER_ROLE.TEACHER, client_1.USER_ROLE.ADMIN), upload_1.multer_up.single("file"), parse_json_1.default, (0, validate_body_1.default)(skill_shcemas_1.skill_schemas.create), skill_controllers_1.skill_controllers.create_one);
// Route for update one skill
router.put("/:id", (0, auth_1.default)(client_1.USER_ROLE.TEACHER, client_1.USER_ROLE.ADMIN), upload_1.multer_up.single("file"), parse_json_1.default, (0, validate_body_1.default)(skill_shcemas_1.skill_schemas.update), skill_controllers_1.skill_controllers.update_one);
// Route for delete one skill
router.delete("/:id", (0, auth_1.default)(client_1.USER_ROLE.TEACHER, client_1.USER_ROLE.ADMIN), skill_controllers_1.skill_controllers.delete_one);
exports.skill_routes = router;
