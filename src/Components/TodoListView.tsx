import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/Todo';

type TodoListViewProps = {
  todos: Todo[];
};

const TodoListView: React.FC<TodoListViewProps> = ({ todos }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Lista de Tareas</h2>
      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{todo.title}</h3>
            <p className="text-gray-600 mb-4">{todo.description}</p>
            <div className="text-left">
              <Link to={`/todos/${todo.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                Ver Detalles
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListView;
