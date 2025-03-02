import { Entity, Fields } from "remult"
import { Relations } from "remult"
import { Student } from "./Student"

@Entity<House>("house", {
  allowApiCrud: true,
  defaultOrderBy: { name: "asc" },
})
export class House {
  @Fields.autoIncrement()
  id = 0

  @Fields.string()
  name!: string

  // Relations toMany
  @Relations.toMany(() => Student)
  Student?: Student[]
}
