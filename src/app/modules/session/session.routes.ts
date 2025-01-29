import { Router } from "express";
import { session_controllers } from "./session.controllers";
import validate_body from "../../utils/validate_body";
import { session_schemas } from "./session.schemas";

// Create router instance
const router = Router();

// Route for fetch all sessions
router.get("/", session_controllers.fetch_all);

// Route for create one session
router.post(
  "/",
  validate_body(session_schemas.create),
  session_controllers.create_one
);

// Route for update one session
router.put(
  "/:id",
  validate_body(session_schemas.update),
  session_controllers.update_one
);

// Route for delete one session
router.delete("/:id", session_controllers.delete_one);

export const session_routes = router;
