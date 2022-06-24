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
const usecases_1 = require("../../../../data/usecases");
const mocks_1 = require("../../mocks");
const mocks_2 = require("../../../domain/mocks");
const errors_1 = require("../../../../domain/errors");
const protocols_1 = require("../../../../data/protocols");
const faker_1 = require("@faker-js/faker");
const makeSut = (ref = faker_1.faker.internet.url()) => {
    const dbService = new mocks_1.DBServiceSpy();
    const sut = new usecases_1.Create(ref, dbService);
    return {
        sut,
        dbService,
    };
};
describe('Create', () => {
    it('Should call DBServer with correct reference and paramas', () => __awaiter(void 0, void 0, void 0, function* () {
        const ref = faker_1.faker.internet.url();
        const { sut, dbService } = makeSut(ref);
        dbService.response = {
            status: protocols_1.DBServiceCode.created,
            body: (0, mocks_2.mockCreateResult)(),
        };
        const params = (0, mocks_2.mockNewEntityParams)();
        yield sut.exec(params);
        expect(dbService.ref).toBe(ref);
        expect(dbService.body).toEqual(params);
    }));
    it('Should throw UnauthorizedError if DBService returns 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, dbService } = makeSut();
        dbService.response = {
            status: protocols_1.DBServiceCode.unauthorized,
        };
        const promise = sut.exec((0, mocks_2.mockNewEntityParams)());
        yield expect(promise).rejects.toThrow(new errors_1.UnauthorizedError());
    }));
    it('Should throw UnexpectedError if DBService returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, dbService } = makeSut();
        dbService.response = {
            status: protocols_1.DBServiceCode.badRequest,
        };
        const promise = sut.exec((0, mocks_2.mockNewEntityParams)());
        yield expect(promise).rejects.toThrow(new errors_1.UnexpectedError());
    }));
    it('Should throw UnexpectedError if DBService returns 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, dbService } = makeSut();
        dbService.response = {
            status: protocols_1.DBServiceCode.serverError,
        };
        const promise = sut.exec((0, mocks_2.mockNewEntityParams)());
        yield expect(promise).rejects.toThrow(new errors_1.UnexpectedError());
    }));
    it('Should return of Create is currect if DBService returns 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, dbService } = makeSut();
        const createResult = (0, mocks_2.mockCreateResult)();
        dbService.response = {
            status: protocols_1.DBServiceCode.created,
            body: createResult,
        };
        const result = yield sut.exec((0, mocks_2.mockNewEntityParams)());
        expect(result.id).toEqual(createResult.id);
    }));
    it('Should throw UnexpectedError when return of Create is empty but DBService returns 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, dbService } = makeSut();
        dbService.response = {
            status: protocols_1.DBServiceCode.created,
        };
        const promise = sut.exec((0, mocks_2.mockNewEntityParams)());
        yield expect(promise).rejects.toThrow(new errors_1.UnexpectedError());
    }));
});
