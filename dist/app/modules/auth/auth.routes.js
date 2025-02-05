"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_routes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const validate_body_1 = __importDefault(require("../../utils/validate_body"));
const auth_schemas_1 = require("./auth.schemas");
// Create a router instance
const router = (0, express_1.Router)();
// Login route
router.post("/login", (0, validate_body_1.default)(auth_schemas_1.auth_schemas.login), auth_controllers_1.auth_controllers.login);
// Register route
router.post("/register", (0, validate_body_1.default)(auth_schemas_1.auth_schemas.create), auth_controllers_1.auth_controllers.register);
router.put("/update-profile/:id", (0, validate_body_1.default)(auth_schemas_1.auth_schemas.update), auth_controllers_1.auth_controllers.update_one);
router.get("/available-teachers", auth_controllers_1.auth_controllers.fetch_available_teachers);
// Export routes as auth_route
exports.auth_routes = router;
