"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_token = exports.generate_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate a JSON Web Token (JWT) using the provided payload and secret
const generate_token = (payload, secret) => {
    const tokenData = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        name: payload.name,
    };
    const token = jsonwebtoken_1.default.sign(tokenData, secret, { expiresIn: "5d" });
    return token;
};
exports.generate_token = generate_token;
// Function to verify the provided token and extract the payload data
const verify_token = (token, secret) => {
    const verified_user = jsonwebtoken_1.default.verify(token, secret);
    return verified_user;
};
exports.verify_token = verify_token;
