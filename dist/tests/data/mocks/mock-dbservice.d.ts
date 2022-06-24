import { DBService, DBServiceParams, DBServiceResponse } from '../../../data/protocols';
export declare class DBServiceSpy<T> implements DBService<T> {
    ref?: string;
    body?: object;
    response: DBServiceResponse<T>;
    create(data: DBServiceParams): Promise<DBServiceResponse<T>>;
}
