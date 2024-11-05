import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/Todo';
import useTodoList from '../hooks/useTodoList';

type TodoListProps = {
  todos: Todo[];
  onAddTodo: (title: string, description: string) => void;
  onUpdateTodo: (id: number, title: string, description: string, isCompleted: boolean) => void;
  onDeleteTodo: (id: number) => void;
  isLoading: boolean;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onAddTodo, onUpdateTodo, onDeleteTodo, isLoading }) => {
  const {
    title,
    description,
    handleTitleChange,
    handleDescriptionChange,
    handleSubmit,
    handleCompleteToggle // Utilizamos la función de cambio de estado
  } = useTodoList(todos, onAddTodo, onUpdateTodo, onDeleteTodo, isLoading);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">My Todo List</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          required
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Add Todo
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map(todo => (
          <li key={todo.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
            <div className="flex justify-between mt-4">
              <Link to={`/todos/${todo.id}`} className="text-blue-500 hover:text-blue-700">View Details</Link>
              <button 
                onClick={() => handleCompleteToggle(todo.id, todo.title, todo.description, !todo.isCompleted)} 
                className={`px-4 py-2 rounded-lg ${todo.isCompleted ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white'} hover:opacity-90`}
              >
                {todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              <button onClick={() => onDeleteTodo(todo.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
