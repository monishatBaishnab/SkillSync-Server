import { Router } from "express";
import { auth_controllers } from "./auth.controllers";
import validate_body from "../../utils/validate_body";
import { auth_schemas } from "./auth.schemas";

// Create a router instance
const router = Router();

// Login route
router.post(
  "/login",
  validate_body(auth_schemas.login),
  auth_controllers.login
);

// Register route
router.post(
  "/register",
  validate_body(auth_schemas.create),
  auth_controllers.register
);

// Export routes as auth_route
export const auth_routes = router;
