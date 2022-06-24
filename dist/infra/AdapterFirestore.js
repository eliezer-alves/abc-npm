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
exports.AdapterFirestore = void 0;
const firebase_1 = require("../config/firebase");
const protocols_1 = require("../data/protocols");
const errors_1 = require("../domain/errors");
const firestore_1 = require("firebase/firestore");
class AdapterFirestore {
    constructor() {
        this.response = {
            status: protocols_1.DBServiceCode.ok,
        };
    }
    create(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let firestoreResponse;
            try {
                firestoreResponse = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, params.ref), params.body);
            }
            catch (e) {
                if (e.code === 'PERMISSION_DENIED') {
                    throw new errors_1.UnauthorizedError();
                }
            }
            if (firestoreResponse === null || firestoreResponse === void 0 ? void 0 : firestoreResponse.id) {
                this.response.status = protocols_1.DBServiceCode.created;
                this.response.body = {
                    id: firestoreResponse.id,
                };
            }
            else {
                this.response = {
                    status: protocols_1.DBServiceCode.badRequest,
                };
            }
            return Promise.resolve(this.response);
        });
    }
}
exports.AdapterFirestore = AdapterFirestore;
