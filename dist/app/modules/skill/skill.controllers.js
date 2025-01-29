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
exports.skill_controllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const send_response_1 = __importDefault(require("../../utils/send_response"));
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const skill_services_1 = require("./skill.services");
// Controller for fetch all skills
const fetch_all = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.skill_services.fetch_all_from_db(req.query);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Skills fetched successfully.",
        data: result,
    });
}));
// Controller for fetch all skills by user is
const fetch_by_user = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.skill_services.fetch_all_by_user_from_db(req.query, req.user);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Skills fetched successfully based on user id.",
        data: result,
    });
}));
// Controller for fetch single skill
const fetch_single = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.skill_services.fetch_single_from_db(req.params.id);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Skill fetched successfully.",
        data: result,
    });
}));
// Controller for create one skill
const create_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.skill_services.create_one_in_db(req.body, req.file, req.user);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.CREATED,
        message: "Skill created successfully.",
        data: result,
    });
}));
// Controller for update one skill
const update_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.skill_services.update_one_from_db(req.body, req.file, req.params.id);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Skill updated successfully.",
        data: result,
    });
}));
// Controller for delete one skill
const delete_one = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield skill_services_1.skill_services.delete_one_from_db(req.params.id);
    (0, send_response_1.default)(res, {
        status: http_status_1.default.OK,
        message: "Skill deleted successfully.",
    });
}));
exports.skill_controllers = {
    fetch_all,
    fetch_by_user,
    fetch_single,
    create_one,
    update_one,
    delete_one,
};
