import { DBService, DBServiceResponse } from '@/data/protocols';
declare type ExpectedCreateResponse = {
    id: string;
};
export declare class AdapterFirestore implements DBService {
    response: DBServiceResponse<any>;
    create(params: any): Promise<DBServiceResponse<ExpectedCreateResponse>>;
}
export {};
