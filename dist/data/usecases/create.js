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
exports.Create = void 0;
const errors_1 = require("../../domain/errors");
const protocols_1 = require("../protocols");
class Create {
    constructor(ref, dbService) {
        this.ref = ref;
        this.dbService = dbService;
    }
    exec(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dbService.create({
                ref: this.ref,
                body: params,
            });
            switch (result.status) {
                case protocols_1.DBServiceCode.created:
                    if (!result.body) {
                        throw new errors_1.UnexpectedError();
                    }
                    return result.body;
                case protocols_1.DBServiceCode.unauthorized:
                    throw new errors_1.UnauthorizedError();
                default:
                    throw new errors_1.UnexpectedError();
            }
        });
    }
}
exports.Create = Create;
