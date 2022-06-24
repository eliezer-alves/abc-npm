export declare type CreateParams = object;
export declare type CreateResult = {
    id: string;
};
export interface Create {
    exec(params: CreateParams): Promise<CreateResult>;
}
