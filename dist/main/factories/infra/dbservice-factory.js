"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDBService = void 0;
const AdapterFirestore_1 = require("@/infra/AdapterFirestore");
const makeDBService = (option = 'firestore') => {
    switch (option) {
        case 'firestore':
            return new AdapterFirestore_1.AdapterFirestore();
        default:
            return new AdapterFirestore_1.AdapterFirestore();
    }
};
exports.makeDBService = makeDBService;
