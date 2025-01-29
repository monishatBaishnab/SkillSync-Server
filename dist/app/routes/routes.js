"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const route_config = [
    {
        path: "/auth",
        route: auth_routes_1.auth_routes,
    },
];
const router = (0, express_1.Router)();
route_config.forEach(({ path, route }) => router.use(path, route));
exports.routes = router;
