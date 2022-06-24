"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBServiceSpy = void 0;
const protocols_1 = require("@/data/protocols");
class DBServiceSpy {
    constructor() {
        this.response = {
            status: protocols_1.DBServiceCode.ok,
        };
    }
    create(data) {
        this.ref = data.ref;
        this.body = data.body;
        return Promise.resolve(this.response);
    }
}
exports.DBServiceSpy = DBServiceSpy;
