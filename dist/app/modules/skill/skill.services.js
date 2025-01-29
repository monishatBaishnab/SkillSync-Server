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
/**
 * Fetch all skills from the database with pagination, filtering, and sorting.
 * @param query - Query parameters for filtering, pagination, and sorting.
 * @returns A list of skills with metadata (pagination details).
 */
const fetch_all_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    // Build filtering conditions based on query parameters (e.g., filtering by 'name' or 'category')
    const whereConditions = (0, wc_builder_1.default)(query, ["name"], ["name", "category"]);
    // Fetch skills with applied filters, pagination, and sorting
    const skills = yield prisma_1.default.skill.findMany({
        where: { AND: [{ AND: whereConditions }] },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total skills matching the query (ignoring pagination)
    const total = yield prisma_1.default.skill.count({
        where: { AND: [{ AND: whereConditions }] },
    });
    return { skills, meta: { page, limit, total } };
});
/**
 * Fetch all skills belonging to a specific user.
 * @param query - Query parameters for filtering, pagination, and sorting.
 * @param user - The authenticated user's JWT payload.
 * @returns A list of skills associated with the user.
 */
const fetch_all_by_user_from_db = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    // Build filtering conditions based on query parameters (e.g., filtering by 'name' or 'category')
    const whereConditions = (0, wc_builder_1.default)(query, ["name"], ["name", "category"]);
    // Fetch skills that belong to the user with applied filters
    const skills = yield prisma_1.default.skill.findMany({
        where: { AND: [{ AND: whereConditions }, { user_id: user.id }] },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total skills matching the query for the specific user
    const total = yield prisma_1.default.skill.count({
        where: { AND: [{ AND: whereConditions }, { user_id: user.id }] },
    });
    return { skills, meta: { page, limit, total } };
});
/**
 * Fetch a single skill by its ID.
 * @param skill_id - The ID of the skill to retrieve.
 * @returns The skill object if found.
 */
const fetch_single_from_db = (skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield prisma_1.default.skill.findUnique({
        where: { id: skill_id },
    });
    return skill;
});
/**
 * Create a new skill in the database.
 * @param payload - Skill data to be stored.
 * @param file - Uploaded file (image) for the skill.
 * @param user - The authenticated user's JWT payload.
 * @returns The newly created skill.
 */
const create_one_in_db = (payload, file, user) => __awaiter(void 0, void 0, void 0, function* () {
    const skill_data = Object.assign(Object.assign({}, payload), { user_id: user.id });
    // Upload image to Cloudinary and set the image URL in skill data
    const uploaded_image_info = yield (0, upload_1.cloudinary_uploader)(file);
    if (uploaded_image_info === null || uploaded_image_info === void 0 ? void 0 : uploaded_image_info.secure_url) {
        skill_data.image = uploaded_image_info.secure_url;
    }
    // Create a new skill record in the database
    const created_skill = yield prisma_1.default.skill.create({
        data: skill_data,
    });
    return created_skill;
});
/**
 * Update an existing skill by ID.
 * @param payload - Partial skill data to update.
 * @param file - Uploaded file (image) for the skill.
 * @param skill_id - The ID of the skill to update.
 * @returns The updated skill.
 */
const update_one_from_db = (payload, file, skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    const skill_data = Object.assign({}, payload);
    // Upload image to Cloudinary and set the image URL in skill data
    const uploaded_image_info = yield (0, upload_1.cloudinary_uploader)(file);
    if (uploaded_image_info === null || uploaded_image_info === void 0 ? void 0 : uploaded_image_info.secure_url) {
        skill_data.image = uploaded_image_info.secure_url;
    }
    // Update the skill record in the database
    const updated_skill = yield prisma_1.default.skill.update({
        data: skill_data,
        where: { id: skill_id },
    });
    return updated_skill;
});
/**
 * Soft delete a skill by setting `isDeleted` to true.
 * @param skill_id - The ID of the skill to delete.
 * @returns An empty object after marking the skill as deleted.
 */
const delete_one_from_db = (skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.skill.update({
        data: { isDeleted: true },
        where: { id: skill_id },
    });
    return {};
});
// Export skill service functions for use in other parts of the application
exports.skill_services = {
    fetch_all_from_db,
    fetch_all_by_user_from_db,
    fetch_single_from_db,
    create_one_in_db,
    update_one_from_db,
    delete_one_from_db,
};
