"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCreateResult = exports.mockNewEntityParams = void 0;
const faker_1 = require("@faker-js/faker");
const mockNewEntityParams = () => ({
    email: faker_1.faker.internet.email(),
    password: faker_1.faker.internet.password(),
});
exports.mockNewEntityParams = mockNewEntityParams;
const mockCreateResult = () => ({
    id: faker_1.faker.random.alphaNumeric(8),
});
exports.mockCreateResult = mockCreateResult;
