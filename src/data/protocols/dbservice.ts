export interface DBService {
  create(params: any, ref: string): Promise<void>
}
