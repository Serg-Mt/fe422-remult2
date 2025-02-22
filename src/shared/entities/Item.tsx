import { Entity, Fields } from 'remult';

@Entity('task', {
  allowApiCrud: true
})
export class Item {
  @Fields.autoIncrement()
  id: number = 0;

  @Fields.string()
  title = ''

  @Fields.boolean()
  completed = false;

  @Fields.createdAt()
  createdAt?: Date;

}