import { Entity, Field, Fields } from "remult"
import { Relations } from "remult"
// import { TeacherSubject } from "./TeacherSubject.js"
import { Grade } from "./Grade"
import { User } from '@/demo/auth/User'


@Entity<Teacher>("teacher", {
  allowApiCrud: true,
  defaultOrderBy: { name: "asc" },
})
export class Teacher {
  @Fields.autoIncrement()
  id = 0

  @Fields.string()
  name!: string

  @Fields.string()
  surname!: string

  @Fields.string({ allowNull: true })
  userId?: string

  @Relations.toOne(() => User, { field: "userId" })
  user?: User

  // Relations toMany
  // @Relations.toMany(() => TeacherSubject)
  // _TeacherSubjects?: TeacherSubject[]

  @Relations.toMany(() => Grade)
  Grade?: Grade[]
}
