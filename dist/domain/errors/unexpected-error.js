"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
class UnexpectedError extends Error {
    constructor() {
        super('An unexpected error has occurred.');
        this.name = 'UnexpectedError';
    }
}
exports.UnexpectedError = UnexpectedError;
