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
exports.skill_services = void 0;
const upload_1 = require("../../middlewares/upload");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const wc_builder_1 = __importDefault(require("../../utils/wc_builder"));
const sanitize_paginate_1 = __importDefault(require("../../utils/sanitize_paginate"));
const fetch_all_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    // Build where conditions based on the query (e.g., filtering by 'name')
    const whereConditions = (0, wc_builder_1.default)(query, ["name"], ["name", "category"]);
    // Fetch products with conditions, pagination, sorting, and nested data
    const skills = yield prisma_1.default.skill.findMany({
        where: {
            AND: [{ AND: whereConditions }],
        },
        skip: skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total products matching the query (ignores pagination)
    const total = yield prisma_1.default.skill.count({
        where: {
            AND: [{ AND: whereConditions }],
        },
    });
    return { skills, meta: { page, limit, total } };
});
const fetch_all_by_user_from_db = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    // Build where conditions based on the query (e.g., filtering by 'name')
    const whereConditions = (0, wc_builder_1.default)(query, ["name"], ["name", "category"]);
    // Fetch products with conditions, pagination, sorting, and nested data
    const skills = yield prisma_1.default.skill.findMany({
        where: {
            AND: [{ AND: whereConditions }, { user_id: user.id }],
        },
        skip: skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total products matching the query (ignores pagination)
    const total = yield prisma_1.default.skill.count({
        where: {
            AND: [{ AND: whereConditions }, { user_id: user.id }],
        },
    });
    return { skills, meta: { page, limit, total } };
});
const fetch_single_from_db = (skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield prisma_1.default.skill.findUnique({
        where: { id: skill_id },
    });
    return skill;
});
const create_one_in_db = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    const skill_data = Object.assign(Object.assign({}, payload), { user_id: user.id });
    // Upload image in cloudinary and set the image link in user data
    const uploaded_image_info = yield (0, upload_1.cloudinary_uploader)(file);
    if (uploaded_image_info === null || uploaded_image_info === void 0 ? void 0 : uploaded_image_info.secure_url) {
        skill_data.image = uploaded_image_info.secure_url;
    }
    const created_skill = yield prisma_1.default.skill.create({
        data: skill_data,
    });
    return created_skill;
});
const update_one_from_db = (payload, file, skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill_data = Object.assign({}, payload);
    // Upload image in cloudinary and set the image link in user data
    const uploaded_image_info = yield (0, upload_1.cloudinary_uploader)(file);
    if (uploaded_image_info === null || uploaded_image_info === void 0 ? void 0 : uploaded_image_info.secure_url) {
        skill_data.image = uploaded_image_info.secure_url;
    }
    const updated_skill = yield prisma_1.default.skill.update({
        data: skill_data,
        where: { id: skill_id },
    });
    return updated_skill;
});
const delete_one_from_db = (skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.skill.update({
        data: { isDeleted: true },
        where: { id: skill_id },
    });
    return {};
});
exports.skill_services = {
    fetch_all_from_db,
    fetch_all_by_user_from_db,
    fetch_single_from_db,
    create_one_in_db,
    update_one_from_db,
    delete_one_from_db,
};
