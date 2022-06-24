import { DBService } from '../../../data/protocols';
import { Create } from '../../../data/usecases';
export declare const makeCreate: (table: string, dbService: DBService) => Create;
