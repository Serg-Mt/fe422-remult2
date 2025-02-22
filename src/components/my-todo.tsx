import { Item } from '@/shared/entities/Item';
import { useState } from 'react';
import { repo } from 'remult';


export function MyTodo() {
  const
    [list, setList] = useState<Item[]>([]),
    [newTaskTitle, setNewTaskTitle] = useState("");

  async function addItem() {
    const newItem = await repo(Item).insert({ title: newTaskTitle });
    setList([...list, newItem]);
  }

  return <div>
    <h3>MyTodo</h3>
    <hr />
    <input
      type="text"
      value={newTaskTitle}
      placeholder="What needs to be done?"
      onChange={(e) => setNewTaskTitle(e.target.value)}
    />
    <button onClick={addItem}>
      <img src="plus.svg" alt="Add" />
    </button>

    <ol>
      {list.map(el => <li key={el.id}>
        {el.title}
      </li>)}
    </ol>
  </div>
}