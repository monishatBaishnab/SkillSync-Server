"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_services = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const jwt_handlers_1 = require("../../utils/jwt_handlers");
const config_1 = require("../../config");
const http_error_1 = __importDefault(require("../../errors/http_error"));
const http_status_1 = __importDefault(require("http-status"));
// Service function for login user
const login_user = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user_info = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const verify_password = bcrypt_1.default.compareSync(payload.password, user_info.password);
    if (!verify_password) {
        throw new http_error_1.default(http_status_1.default.BAD_REQUEST, "Password Not Match.");
    }
    const token = (0, jwt_handlers_1.generate_token)(user_info, config_1.local_config.jwt_secret);
    return { token };
});
// Service function for register user
const register_user = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user_data = Object.assign({}, payload);
    const hashed_password = bcrypt_1.default.hashSync(payload.password, 11);
    user_data.password = hashed_password;
    const created_user = yield prisma_1.default.user.create({
        data: user_data,
    });
    const token = (0, jwt_handlers_1.generate_token)(created_user, config_1.local_config.jwt_secret);
    return { token };
});
// Service function for register user
const update_one = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user_data = Object.assign({}, payload);
    delete user_data.password;
    delete user_data.email;
    const created_user = yield prisma_1.default.user.update({
        data: user_data,
        where: { id },
    });
    const token = (0, jwt_handlers_1.generate_token)(created_user, config_1.local_config.jwt_secret);
    return { token };
});
exports.auth_services = {
    login_user,
    register_user,
    update_one
};
