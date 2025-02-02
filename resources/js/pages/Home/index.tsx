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
    <div className="p-4">
      <h1 className="text-2xl font-black uppercase mb-2">
        To-do List
      </h1>

      <form
        className="flex mb-4"
        onSubmit={handleNewTodo}
      >
        <input
          className="px-2 bg-gray-100 border-2 border-transparent focus:border-black border-r-0 rounded-l outline-none transition-colors"
          type="text"
          name="todo"
          value={newTodo}
          onInput={handleTodoInput}
        />
        <button
          className="bg-blue-600 hover:bg-blue-800 transition-colors py-2 px-4 rounded-r text-white"
          type="submit"
        >
          Criar nova tarefa
        </button>
      </form>

      <ul className="flex flex-col gap-y-2">
        {todos.map((todo) => (
          <li
            className="flex items-center gap-x-1"
            key={todo.id}
          >
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
