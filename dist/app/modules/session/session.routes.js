"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session_routes = void 0;
const express_1 = require("express");
const session_controllers_1 = require("./session.controllers");
// Create router instance
const router = (0, express_1.Router)();
// Route for fetch all sessions
router.get("/", session_controllers_1.session_controllers.fetch_all);
// Route for fetch sessions by user id
router.get("/user/:id", session_controllers_1.session_controllers.fetch_by_user);
// Route for fetch single session
router.get("/:id", session_controllers_1.session_controllers.fetch_single);
// Route for create one session
router.post("/", session_controllers_1.session_controllers.create_one);
// Route for update one session
router.put("/:id", session_controllers_1.session_controllers.update_one);
// Route for delete one session
router.delete("/:id", session_controllers_1.session_controllers.delete_one);
exports.session_routes = router;
