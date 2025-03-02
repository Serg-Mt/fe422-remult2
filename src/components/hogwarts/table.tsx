'use client';
import { useEffect, useState } from 'react';
import css from './table.module.css'
import { repo } from 'remult';

export function ShowTable({ itemClass, include = {} }) {
  const
    [data, setData] = useState(null),
    [error, setError] = useState(null),
    fields = Object.getOwnPropertyNames(data?.[0] || {});
  Object.assign(globalThis, { ['_' + itemClass.name]: { data, fields } })

  useEffect(() => {
    repo(itemClass).find({ include }).then(setData).catch(setError);
  }, []);
  console.debug('ShowTable', { itemClass, fields });
  return <table className={css.table}>
    <caption>{itemClass.name}</caption>
    <thead>
      <tr>
        {fields.map(field => <th key={field}>
          {field}
        </th>)}
      </tr>
    </thead>
    {data &&
      <tbody>
        {data.map(obj => <tr key={obj.id}>
          {fields.map(field => <td key={field}>
            {cell(obj[field])}
          </td>)}
        </tr>)}
      </tbody>
    }
  </table>
}

function cell(data) {
  switch (true) {
    case null === data: return 'NULL';
    case undefined === data: return 'undef';
    case Array.isArray(data): return '[' + data.map(cell).join(', ') + ']';
    case 'object' === typeof data: return JSON.stringify(data);
    case 'function' === typeof data?.toString: return data.toString();
    default:
      return data;
  }
}