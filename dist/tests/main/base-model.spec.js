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
const faker_1 = require("@faker-js/faker");
const models_1 = require("../../main/models");
const makeSut = () => {
    const table = 'users-test';
    const columns = ['name', 'email'];
    const sut = new models_1.BaseModel(table, columns);
    return { sut };
};
describe('BaseModel', () => {
    it('Should return correct response when execute create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const params = {
            name: faker_1.faker.name.firstName(),
            email: faker_1.faker.internet.email(),
        };
        const result = yield sut.create(params);
        expect(typeof result.id).toBe('string');
    }));
});
