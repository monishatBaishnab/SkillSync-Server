import { Router } from "express";
import { auth_routes } from "../modules/auth/auth.routes";
import { skill_routes } from "../modules/skill/skill.routes";
import { session_routes } from "../modules/session/session.routes";
import { review_routes } from "../modules/review/review.routes";
import { availability_routes } from "../modules/availability/availability.routes";

const route_config = [
  {
    path: "/auth",
    route: auth_routes,
  },
  {
    path: "/skills",
    route: skill_routes,
  },
  {
    path: "/session",
    route: session_routes,
  },
  {
    path: "/review",
    route: review_routes,
  },
  {
    path: "/availabilities",
    route: availability_routes,
  },
];
const router = Router();

route_config.forEach(({ path, route }) => router.use(path, route));

export const routes = router;
