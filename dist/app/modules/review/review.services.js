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
Object.defineProperty(exports, "__esModule", { value: true });
exports.review_services = void 0;
const fetch_all_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const fetch_single_from_db = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const create_one_in_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const update_one_from_db = (payload, skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
const delete_one_from_db = (skill_id) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
exports.review_services = {
    fetch_all_from_db,
    fetch_single_from_db,
    create_one_in_db,
    update_one_from_db,
    delete_one_from_db,
};
