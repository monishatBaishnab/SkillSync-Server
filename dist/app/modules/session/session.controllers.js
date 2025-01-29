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
const session_services_1 = require("./session.services");
// Controller for fetch all sessions by user id
const fetch_all = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield session_services_1.session_services.fetch_all_from_db(req.query);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Sessions fetched successfully.",
        data: result,
    });
}));
// Controller for create one session
const create_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield session_services_1.session_services.create_one_in_db(req.body);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.CREATED,
        message: "Session created successfully.",
        data: result,
    });
}));
// Controller for update one session
const update_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield session_services_1.session_services.update_one_from_db(req.body, req.params.id);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Session updated successfully.",
        data: result,
    });
}));
// Controller for delete one session
const delete_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield session_services_1.session_services.delete_one_from_db(req.params.id);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Session deleted successfully.",
    });
}));
exports.session_controllers = {
    fetch_all,
    create_one,
    update_one,
    delete_one,
};
