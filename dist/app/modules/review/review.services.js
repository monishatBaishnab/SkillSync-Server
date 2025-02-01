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
exports.review_services = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const sanitize_paginate_1 = __importDefault(require("../../utils/sanitize_paginate"));
const fetch_all_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize query parameters for pagination and sorting
    const { page, limit, skip, sortBy, sortOrder } = (0, sanitize_paginate_1.default)(query);
    // Fetch reviews that belong to the user with applied filters
    const reviews = yield prisma_1.default.review.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
    });
    // Count total reviews matching the query for the specific user
    const total = yield prisma_1.default.review.count({});
    return { reviews, meta: { page, limit, total } };
});
const create_one_in_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const created_review = yield prisma_1.default.review.create({
        data: Object.assign(Object.assign({}, payload), { rating: String(payload === null || payload === void 0 ? void 0 : payload.rating) }),
    });
    return created_review;
});
const update_one_from_db = (payload, review_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.findUniqueOrThrow({
        where: { id: review_id },
    });
    const updated_review = yield prisma_1.default.review.update({
        data: payload,
        where: { id: review_id },
    });
    return updated_review;
});
exports.review_services = {
    fetch_all_from_db,
    create_one_in_db,
    update_one_from_db,
};
