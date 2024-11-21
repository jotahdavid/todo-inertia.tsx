import { FormEvent, useState } from 'react';

interface HomeProps {}

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export default function Home({}: HomeProps) {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleTodoInput(event: FormEvent<HTMLInputElement>) {
    setNewTodo(event.currentTarget.value);
  }

  function handleNewTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newTodo.length === 0) return;

    setTodos((prev) => [
      ...prev,
      {
        id: crypto.getRandomValues(new Uint32Array(1)).toString(),
        title: newTodo,
        isCompleted: false,
      },
    ]);

    setNewTodo('');
  }

  return (
    <div>
      <h1>To-do List</h1>

      <form onSubmit={handleNewTodo}>
        <input
          type="text"
          name="todo"
          value={newTodo}
          onInput={handleTodoInput}
        />
        <button type="submit">
          Criar nova tarefa
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" id={`todo.${todo.id}`}/>
            <label htmlFor={`todo.${todo.id}`}>
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
