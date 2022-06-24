export declare class BaseModel {
    readonly table: string;
    readonly columns: Array<string>;
    private dbService;
    private _create;
    constructor(table: string, columns: Array<string>);
    create(params: object): Promise<import("@/domain/usecases").CreateResult>;
}
