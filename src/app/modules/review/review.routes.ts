import { Router } from "express";
import { review_controllers } from "./review.controllers";

// Create router instance
const router = Router();

// Route for fetch all reviews
router.get("/", review_controllers.fetch_all);

// Route for fetch single review
router.get("/:id", review_controllers.fetch_single);

// Route for create one review
router.post("/", review_controllers.create_one);

// Route for update one review
router.put("/:id", review_controllers.update_one);

// Route for delete one review
router.delete("/:id", review_controllers.delete_one);

export const review_routes = router;
