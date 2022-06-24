export declare type DBServiceParams = {
    ref: string;
    body?: any;
};
export declare enum DBServiceCode {
    ok = 200,
    created = 201,
    badRequest = 400,
    unauthorized = 401,
    serverError = 500
}
export declare type DBServiceResponse<T> = {
    status: DBServiceCode;
    body?: T;
};
export interface DBService<T = any> {
    create(params: DBServiceParams): Promise<DBServiceResponse<T>>;
}
