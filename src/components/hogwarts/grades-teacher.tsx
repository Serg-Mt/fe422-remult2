
import { FormEvent, useEffect, useState } from 'react';

import css from './table.module.css'
import { Grade } from '@/shared/entities/Grade';
import { repo } from 'remult';

async function addGrade(event: FormEvent<HTMLFormElement>, needReload: () => void) {
  event.preventDefault();
  const
    form = event.target as HTMLFormElement,
    formData = new FormData(form),
    data = Object.fromEntries(formData.entries());
  console.log('addGrade', data);
  const res = await repo(Grade).insert(data);
  console.log('res=',res);
  // await fetch('/api/grade', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });

}

export function GradesTeacher() {
  const
    [revalidate, setRevalidate] = useState(0),
    [grades, setGrades] = useState<Grade[]>([]),
    [error, setError] = useState(null),
    gradesByUsers = Object.groupBy(grades, grade => grade.studentId),
    studentsIDs = Object.keys(gradesByUsers);


  useEffect(() => {
    repo(Grade).find({ include: { student: true } }).then(setGrades, setError);
  }, [revalidate]);

  return <table className={css.table}>
    <caption>Teacher Grades</caption>
    <thead>
      <tr>
        <th>Student</th>
        <th>Points</th>
        <th>add</th>
      </tr>
    </thead>
    <tbody>
      {studentsIDs.map((stID) =>

        <tr key={stID}>
          <td>{gradesByUsers[stID][0].student.name}</td>
          <td>{gradesByUsers[stID].map(({ point }) => point).join(', ')}</td>
          <td>
            <form onSubmit={async evt => {
              evt.preventDefault();
              await addGrade(evt);
              setRevalidate(x => 1 + x);
            }}>
              <input type="hidden" name="studentId" value={stID} />
              <input min="1" max="12" type="number" name="point" />
              <button type="submit">add</button>
            </form>
          </td>
        </tr>

      )}
    </tbody>
  </table>;
}