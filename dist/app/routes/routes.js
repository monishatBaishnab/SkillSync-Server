"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const skill_routes_1 = require("../modules/skill/skill.routes");
const session_routes_1 = require("../modules/session/session.routes");
const review_routes_1 = require("../modules/review/review.routes");
const availability_routes_1 = require("../modules/availability/availability.routes");
const route_config = [
    {
        path: "/auth",
        route: auth_routes_1.auth_routes,
    },
    {
        path: "/skills",
        route: skill_routes_1.skill_routes,
    },
    {
        path: "/session",
        route: session_routes_1.session_routes,
    },
    {
        path: "/review",
        route: review_routes_1.review_routes,
    },
    {
        path: "/availabilities",
        route: availability_routes_1.availability_routes,
    },
];
const router = (0, express_1.Router)();
route_config.forEach(({ path, route }) => router.use(path, route));
exports.routes = router;
