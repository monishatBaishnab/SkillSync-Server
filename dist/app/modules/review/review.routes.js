"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.review_routes = void 0;
const express_1 = require("express");
const review_controllers_1 = require("./review.controllers");
// Create router instance
const router = (0, express_1.Router)();
// Route for fetch all reviews
router.get("/", review_controllers_1.review_controllers.fetch_all);
// Route for fetch single review
router.get("/:id", review_controllers_1.review_controllers.fetch_single);
// Route for create one review
router.post("/", review_controllers_1.review_controllers.create_one);
// Route for update one review
router.put("/:id", review_controllers_1.review_controllers.update_one);
// Route for delete one review
router.delete("/:id", review_controllers_1.review_controllers.delete_one);
exports.review_routes = router;
