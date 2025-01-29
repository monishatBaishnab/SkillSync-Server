import { Router } from "express";
import { availability_controllers } from "./availability.controllers";

const router = Router();

router.get("/", availability_controllers.fetch_all);

router.post("/", availability_controllers.create_one);

export const availability_routes = router;
