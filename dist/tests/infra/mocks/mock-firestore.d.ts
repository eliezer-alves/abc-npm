/// <reference types="jest" />
import * as firestore from 'firebase/firestore';
export declare const mockAddDocResponse: () => any;
export declare enum FirestoreErrorCode {
    PERMISSION_DENIED = "PERMISSION_DENIED"
}
export declare class FirestoreError extends Error {
    code: string;
    constructor(code?: string, message?: string);
}
export declare class MockFirestore {
    private mockedFirestore;
    private isError;
    private errorCode?;
    private errorMessage?;
    mockAddDock(expectedResponse?: any): jest.Mocked<typeof firestore>;
    throwError(code: FirestoreErrorCode, message?: string): void;
}
