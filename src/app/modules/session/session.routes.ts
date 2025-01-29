import { Router } from "express";
import { session_controllers } from "./session.controllers";

// Create router instance
const router = Router();

// Route for fetch all sessions
router.get("/", session_controllers.fetch_all);

// Route for fetch sessions by user id
router.get("/user/:id", session_controllers.fetch_by_user);

// Route for fetch single session
router.get("/:id", session_controllers.fetch_single);

// Route for create one session
router.post("/", session_controllers.create_one);

// Route for update one session
router.put("/:id", session_controllers.update_one);

// Route for delete one session
router.delete("/:id", session_controllers.delete_one);

export const session_routes = router;
