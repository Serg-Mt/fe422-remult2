import { Item } from '@/shared/entities/Item';
import { useEffect, useState } from 'react';
import { repo } from 'remult';



function cx(...c: any[]) {
  return c
    .filter(p => 'string' === typeof p)
    .join(' ');
}
export function MyTodo() {
  const
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null),
    [list, setList] = useState<Item[]>([]),
    [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    repo(Item)
      .find()
      .then(setList)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  async function addItem() {
    const optimisticItem = new Item;
    optimisticItem.title = newTaskTitle;
    optimisticItem.temp = true;
    setList([...list, optimisticItem]);
    try {
      const
        newItem = await repo(Item).insert({ title: newTaskTitle });

    } catch (err) {
      // toster
    } finally {
      const list = await repo(Item).find();
      setList(list);
    }
  }

  async function delItem(id) {
    const
      index = list.findIndex(el => id === el.id),
      delItem = list[index];
    delItem.del = true;
    setList(list.with(index, delItem));
    try {
      const res = await repo(Item).delete(id);
      console.log('res=', res);
    } catch (error) {
      // toster
    } finally {
      const
        list = await repo(Item).find();
      setList(list);
    }



  }

  console.log('error=', error);
  if (error) return <ShowError error={error} />
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
    {loading ? <Spinner /> :
      <ol>
        {list.map(el => <li key={el.id} className={cx(el.temp && 'temp', el.del && 'del')}>
          ({el.id}) -
          {el.title}<button onClick={() => delItem(el.id)}>❌</button>
        </li>)}
      </ol>
    }
  </div>
}
function Spinner() {
  return <div>loading...</div>
}

function ShowError({ error }) {
  return <div className="error">
    Error: {error.message} {error?.status}
  </div >;
}