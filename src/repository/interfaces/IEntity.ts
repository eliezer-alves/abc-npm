export interface IEntity<T = any> {
  create(attr: T): Promise<string>
}
