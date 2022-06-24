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
const protocols_1 = require("../../data/protocols");
const errors_1 = require("../../domain/errors");
const AdapterFirestore_1 = require("../../infra/AdapterFirestore");
const mocks_1 = require("../../tests/domain/mocks");
const mocks_2 = require("../../tests/infra/mocks");
jest.mock('firebase/firestore');
const requestCreateNewEntity = {
    ref: 'rooms/',
    body: (0, mocks_1.mockNewEntityParams)(),
};
const makeSut = () => {
    const sut = new AdapterFirestore_1.AdapterFirestore();
    const mockFirestore = new mocks_2.MockFirestore();
    return {
        sut,
        mockFirestore,
    };
};
describe('AdapterFirestore', () => {
    test('Should call firebase with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, mockFirestore } = makeSut();
        const mockedPush = mockFirestore.mockAddDock();
        yield sut.create(requestCreateNewEntity);
        expect(mockedPush.addDoc).toHaveBeenCalledWith(undefined, requestCreateNewEntity.body);
    }));
    test('Should return correct response', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, mockFirestore } = makeSut();
        const addDockResponse = (0, mocks_2.mockAddDocResponse)();
        const expectedResponse = {
            status: protocols_1.DBServiceCode.created,
            body: addDockResponse,
        };
        mockFirestore.mockAddDock(addDockResponse);
        const response = yield sut.create(requestCreateNewEntity);
        expect(expectedResponse).toEqual(response);
    }));
    test('Should throw UnauthorizedError if firebase returns PERMISSION_DENIED', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, mockFirestore } = makeSut();
        mockFirestore.throwError(mocks_2.FirestoreErrorCode.PERMISSION_DENIED);
        mockFirestore.mockAddDock();
        const promise = sut.create(requestCreateNewEntity);
        yield expect(promise).rejects.toThrow(new errors_1.UnauthorizedError());
    }));
});
