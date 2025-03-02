'use client';
import { GradesTeacher } from '@/components/hogwarts/grades-teacher';
import { ShowTable } from '@/components/hogwarts/table';
import { Grade } from '@/shared/entities/Grade';
import { House } from '@/shared/entities/House';
import { Item } from '@/shared/entities/Item';
import { Student } from '@/shared/entities/Student';
import { Teacher } from '@/shared/entities/Teacher';



Object.assign(globalThis, { Student, Item, House, Teacher });
export default function Page() {
  return <div>
    <h1>Hogwarts</h1>
    <GradesTeacher />
    <ShowTable itemClass={House} />
    <ShowTable itemClass={Student} include={{house:true}} />
    <ShowTable itemClass={Teacher} />
    <ShowTable itemClass={Grade} />

  </div>
}