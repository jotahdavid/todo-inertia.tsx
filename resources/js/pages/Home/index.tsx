import { FormEvent, useState } from 'react';
import todosService from '@app/services/todosService';

interface HomeProps {
  todos: Todo[];
}

interface Todo {
  id: number;
  title: string;
  is_completed: boolean;
}

export default function Home({ todos }: HomeProps) {
  const [newTodo, setNewTodo] = useState('');

  function handleTodoInput(event: FormEvent<HTMLInputElement>) {
    setNewTodo(event.currentTarget.value);
  }

  async function handleNewTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newTodo.length === 0) return;

    await todosService.create({
      title: newTodo,
    });

    setNewTodo('');
  }

  async function handleToggleTodoComplete(todoId: number ) {
    const todoToUpdate = todos.find((todo) => todo.id === todoId);

    if (!todoToUpdate) return;

    await todosService.edit({
      id: todoId,
      is_completed: !todoToUpdate.is_completed,
    });
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
            <input
              type="checkbox"
              id={`todo.${todo.id}`}
              checked={todo.is_completed}
              onChange={() => handleToggleTodoComplete(todo.id)}
            />
            <label htmlFor={`todo.${todo.id}`}>
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
