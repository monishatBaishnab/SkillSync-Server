import { Router } from "express";
import { auth_routes } from "../modules/auth/auth.routes";

const route_config = [
  {
    path: "/auth",
    route: auth_routes,
  },
];
const router = Router();

route_config.forEach(({ path, route }) => router.use(path, route));

export const routes = router;
