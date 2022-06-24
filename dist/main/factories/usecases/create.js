"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreate = void 0;
const usecases_1 = require("@/data/usecases");
const makeCreate = (table, dbService) => {
    return new usecases_1.Create(table, dbService);
};
exports.makeCreate = makeCreate;
