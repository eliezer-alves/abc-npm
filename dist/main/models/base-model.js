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
exports.BaseModel = void 0;
const infra_1 = require("../factories/infra");
const create_1 = require("../factories/usecases/create");
class BaseModel {
    constructor(table, columns) {
        this.table = table;
        this.columns = columns;
        this.dbService = (0, infra_1.makeDBService)();
        this._create = (0, create_1.makeCreate)(table, this.dbService);
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._create.exec(params);
            return response;
        });
    }
}
exports.BaseModel = BaseModel;
