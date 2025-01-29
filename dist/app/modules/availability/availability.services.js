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
exports.availability_services = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const sanitize_paginate_1 = __importDefault(require("../../utils/sanitize_paginate"));
const http_status_1 = require("http-status");
const http_error_1 = __importDefault(require("../../errors/http_error"));
const create_time_slot_1 = require("../../utils/create_time_slot");
const date_validator_1 = require("../../utils/date_validator");
const wc_builder_1 = __importDefault(require("../../utils/wc_builder"));
/**
 * Fetch all availabilities from the database with pagination, sorting, and applied filters.
 * @param query - The query parameters for pagination, sorting, and filters.
 * @returns An object containing the list of availabilities and pagination metadata.
 */
const fetch_all_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    const whereConditions = (0, wc_builder_1.default)(query, ["date"], ["date"]);
    // Fetch availabilities that belong to the user with applied filters
    const availabilities = yield prisma_1.default.availability.findMany({
        where: { AND: whereConditions },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total availabilities matching the query for the specific user
    const total = yield prisma_1.default.availability.count({
        where: { AND: whereConditions },
    });
    return { availabilities, meta: { page, limit, total } };
});
/**
 * Create new availability sessions in the database based on the given session data.
 * It validates session dates, checks for overlapping sessions, and generates time slots.
 * @param session_payload - The data for the new availability session.
 * @returns An array of created availability session slots.
 */
const create_one_in_db = (session_payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch skill details associated with the session
    const skill_details = yield prisma_1.default.skill.findUniqueOrThrow({
        where: { id: session_payload.skill_id },
    });
    // Check for existing sessions on the same date and skill
    const existing_sessions = yield prisma_1.default.availability.findMany({
        where: {
            date: session_payload.date,
            skill_id: session_payload.skill_id,
        },
    });
    // Validate session date
    const is_date_valid = (0, date_validator_1.date_validator)(session_payload.date);
    if (!is_date_valid) {
        throw new http_error_1.default(http_status_1.NOT_FOUND, "The date is invalid. It cannot be a past date.");
    }
    // Ensure that the skill exists
    if (!skill_details) {
        throw new http_error_1.default(http_status_1.NOT_FOUND, "Skill not found.");
    }
    // Check for overlapping session slots
    existing_sessions.forEach((existing_session) => {
        const existing_start = new Date(`1970-01-01T${existing_session.start_time}`);
        const new_start = new Date(`1970-01-01T${session_payload.start_time}`);
        const existing_end = new Date(`1970-01-01T${existing_session.end_time}`);
        const new_end = new Date(`1970-01-01T${session_payload.end_time}`);
        if (existing_start < new_end && existing_end > new_start) {
            throw new http_error_1.default(http_status_1.CONFLICT, "Slot overlaps with an existing session.");
        }
    });
    // Generate time slots based on duration
    const slots = [];
    const time_slots = (0, create_time_slot_1.create_time_slot)(session_payload.start_time, session_payload.end_time, Number(session_payload.duration));
    delete session_payload.duration;
    // Create a new availability slot for each generated time slot
    time_slots.forEach(({ startTime, endTime }) => {
        slots.push(Object.assign(Object.assign({}, session_payload), { start_time: startTime, end_time: endTime }));
    });
    // Insert the generated availability slots into the database
    const created_availabilities = yield prisma_1.default.availability.createMany({
        data: slots,
    });
    return created_availabilities;
});
// Export availability service functions for use in other parts of the application
exports.availability_services = {
    fetch_all_from_db,
    create_one_in_db,
};
