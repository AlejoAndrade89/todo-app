import React from 'react';
import { Todo } from '../types/Todo';
import useTodoItem from '../hooks/useTodoItem';

type TodoItemProps = {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const { handleCompleteToggle, handleDelete } = useTodoItem(todo, onUpdate, onDelete);

  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md max-w-full mx-auto overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{todo.title}</h3>
      <p
        className="text-sm text-gray-600 mb-4 max-h-20 overflow-y-auto break-words"
        style={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
      >
        {todo.description}
      </p>
      <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleCompleteToggle}
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            todo.isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          } transition duration-200 w-full sm:w-auto`}
        >
          {todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition duration-200 w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
