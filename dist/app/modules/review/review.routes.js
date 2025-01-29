"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.review_routes = void 0;
const express_1 = require("express");
const review_controllers_1 = require("./review.controllers");
// Create router instance
const router = (0, express_1.Router)();
// Route for fetch all reviews
router.get("/", review_controllers_1.review_controllers.fetch_all);
// Route for create one review
router.post("/", review_controllers_1.review_controllers.create_one);
// Route for update one review
router.put("/:id", review_controllers_1.review_controllers.update_one);
exports.review_routes = router;
