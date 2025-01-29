import { Router } from "express";
import { review_controllers } from "./review.controllers";

// Create router instance
const router = Router();

// Route for fetch all reviews
router.get("/", review_controllers.fetch_all);

// Route for create one review
router.post("/", review_controllers.create_one);

// Route for update one review
router.put("/:id", review_controllers.update_one);

export const review_routes = router;
