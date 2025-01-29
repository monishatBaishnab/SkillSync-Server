"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.session_routes = void 0;
const express_1 = require("express");
const session_controllers_1 = require("./session.controllers");
const validate_body_1 = __importDefault(require("../../utils/validate_body"));
const session_schemas_1 = require("./session.schemas");
// Create router instance
const router = (0, express_1.Router)();
// Route for fetch all sessions
router.get("/", session_controllers_1.session_controllers.fetch_all);
// Route for create one session
router.post("/", (0, validate_body_1.default)(session_schemas_1.session_schemas.create), session_controllers_1.session_controllers.create_one);
// Route for update one session
router.put("/:id", (0, validate_body_1.default)(session_schemas_1.session_schemas.update), session_controllers_1.session_controllers.update_one);
// Route for delete one session
router.delete("/:id", session_controllers_1.session_controllers.delete_one);
exports.session_routes = router;
