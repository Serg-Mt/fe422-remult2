import { Entity, Field, Fields } from "remult"
import { Relations } from "remult"
// import { StudentSubject } from "./StudentSubject.js"
import { Grade } from "./Grade"
import { User } from "@/demo/auth/User";
import { House } from "./House"

@Entity<Student>("student", {
  allowApiCrud: true,
  defaultOrderBy: { name: "asc" },
})
export class Student {
  @Fields.autoIncrement()
  id = 0

  @Fields.string()
  name!: string

  @Fields.string()
  surname!: string

  @Fields.integer()
  age!: number

  @Fields.string({ allowNull: true })
  userId?: string

  @Relations.toOne(() => User, { field: "userId" })
  user?: User

  @Fields.integer({ allowNull: true })
  houseId?: number

  @Relations.toOne(() => House, { field: "houseId" })
  house?: House

  // Relations toMany
  // @Relations.toMany(() => StudentSubject)
  // _StudentSubjects?: StudentSubject[]

  @Relations.toMany(() => Grade)
  Grade?: Grade[]
}
