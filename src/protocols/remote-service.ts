export interface IRemoteService {
  create(attr: any): Promise<string>
  // find(id: string): Promise<any>
}
