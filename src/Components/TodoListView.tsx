import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/Todo';

type TodoListViewProps = {
  todos: Todo[];
};

const TodoListView: React.FC<TodoListViewProps> = ({ todos }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Lista de Tareas</h2>
      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <p>{todo.description}</p>
            <div className="mt-2">
              <Link to={`/todos/${todo.id}`} className="text-blue-500 hover:text-blue-700">Ver Detalles</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListView;
