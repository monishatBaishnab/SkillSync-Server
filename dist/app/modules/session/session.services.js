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
exports.session_services = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const wc_builder_1 = __importDefault(require("../../utils/wc_builder"));
const sanitize_paginate_1 = __importDefault(require("../../utils/sanitize_paginate"));
/**
 * Fetch all sessions from the database with pagination, filtering, and sorting.
 * @param query - Query parameters for filtering, pagination, and sorting.
 * @returns A list of sessions with metadata (pagination details).
 */
const fetch_all_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    // Build filtering conditions based on query parameters (e.g., filtering by 'name')
    const whereConditions = (0, wc_builder_1.default)(query, ["name"], ["name"]);
    // Fetch sessions with applied filters, pagination, sorting, and nested data
    const sessions = yield prisma_1.default.session.findMany({
        where: {
            AND: [
                { AND: whereConditions },
                { teacher_id: query === null || query === void 0 ? void 0 : query.teacher_id },
            ],
        },
        skip: skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total sessions matching the query (ignoring pagination)
    const total = yield prisma_1.default.session.count({
        where: {
            AND: [
                { AND: whereConditions },
                { teacher_id: query === null || query === void 0 ? void 0 : query.teacher_id },
            ],
        },
    });
    return { sessions, meta: { page, limit, total } };
});
/**
 * Creates multiple session slots in the database.
 * @param session_payload - The session details, including optional duration.
 * @returns The newly created session record.
 */
const create_one_in_db = (session_payload) => __awaiter(void 0, void 0, void 0, function* () {
    const created_session = yield prisma_1.default.session.create({
        data: session_payload,
    });
    return created_session;
});
/**
 * Update an existing session by ID.
 * @param payload - Partial session data to update.
 * @param session_id - The ID of the session to update.
 * @returns The updated session.
 */
const update_one_from_db = (payload, session_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the session exists before attempting to update
    yield prisma_1.default.session.findUniqueOrThrow({
        where: { id: session_id },
    });
    // Update session data in the database
    const updated_session = yield prisma_1.default.session.update({
        data: payload,
        where: { id: session_id },
    });
    return updated_session;
});
/**
 * Soft delete a session by setting `isDeleted` to false.
 * @param session_id - The ID of the session to delete.
 * @returns The updated session marked as deleted.
 */
const delete_one_from_db = (session_id) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the session exists before attempting to delete
    yield prisma_1.default.session.findUniqueOrThrow({
        where: { id: session_id },
    });
    // Update session status instead of completely removing it from the database
    const deleted_session = yield prisma_1.default.session.update({
        data: { isDeleted: false },
        where: { id: session_id },
    });
    return deleted_session;
});
// Export session service functions for use in other parts of the application
exports.session_services = {
    fetch_all_from_db,
    create_one_in_db,
    update_one_from_db,
    delete_one_from_db,
};
