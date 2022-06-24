import { CreateParams, CreateResult } from '../../domain/usecases';
import { DBService } from '../protocols';
export declare class Create {
    private readonly ref;
    private readonly dbService;
    id?: string;
    constructor(ref: string, dbService: DBService<CreateResult>);
    exec(params: CreateParams): Promise<CreateResult>;
}
