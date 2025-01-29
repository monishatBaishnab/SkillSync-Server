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
exports.session_controllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const send_response_1 = __importDefault(require("../../utils/send_response"));
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
// Controller for fetch all sessions
const fetch_all = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "",
    });
}));
// Controller for fetch all sessions by user id
const fetch_by_user = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "",
    });
}));
// Controller for fetch single session
const fetch_single = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "",
    });
}));
// Controller for create one session
const create_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "",
    });
}));
// Controller for update one session
const update_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "",
    });
}));
// Controller for delete one session
const delete_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "",
    });
}));
exports.session_controllers = {
    fetch_all,
    fetch_by_user,
    fetch_single,
    create_one,
    update_one,
    delete_one,
};
