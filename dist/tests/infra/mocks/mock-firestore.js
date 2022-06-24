"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockFirestore = exports.FirestoreError = exports.FirestoreErrorCode = exports.mockAddDocResponse = void 0;
const firestore = __importStar(require("firebase/firestore"));
const faker_1 = require("@faker-js/faker");
const mockAddDocResponse = () => ({
    id: faker_1.faker.random.alphaNumeric(10),
});
exports.mockAddDocResponse = mockAddDocResponse;
var FirestoreErrorCode;
(function (FirestoreErrorCode) {
    FirestoreErrorCode["PERMISSION_DENIED"] = "PERMISSION_DENIED";
})(FirestoreErrorCode = exports.FirestoreErrorCode || (exports.FirestoreErrorCode = {}));
class FirestoreError extends Error {
    constructor(code = '', message = 'Firestore Error') {
        super(message);
        this.name = 'FirestoreError';
        this.code = code;
    }
}
exports.FirestoreError = FirestoreError;
class MockFirestore {
    constructor() {
        this.mockedFirestore = firestore;
        this.isError = false;
        this.errorMessage = 'Mocked Firestore Error';
    }
    mockAddDock(expectedResponse = (0, exports.mockAddDocResponse)()) {
        if (this.isError) {
            this.mockedFirestore.addDoc.mockClear().mockImplementation(() => {
                throw new FirestoreError(this.errorCode, this.errorMessage);
            });
        }
        else {
            this.mockedFirestore.addDoc.mockResolvedValue(expectedResponse);
        }
        return this.mockedFirestore;
    }
    throwError(code, message) {
        this.isError = true;
        this.errorCode = code;
        this.errorMessage = message;
    }
}
exports.MockFirestore = MockFirestore;
