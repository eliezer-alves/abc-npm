import { IRemoteService } from '@/protocols/remote-service'
import { BaseEntity } from '@/repository/BaseEntity'

export class Create {
  constructor(private readonly remoteService: IRemoteService) {}

  async exec(attr: any, entity: BaseEntity): Promise<void> {
    entity.data = attr[entity.primaryKey]
    const data = await this.remoteService.create(attr)
    entity.hydrator(data)
  }
}
