"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availability_routes = void 0;
const express_1 = require("express");
const availability_controllers_1 = require("./availability.controllers");
const router = (0, express_1.Router)();
router.get("/", availability_controllers_1.availability_controllers.fetch_all);
router.post("/", availability_controllers_1.availability_controllers.create_one);
exports.availability_routes = router;
