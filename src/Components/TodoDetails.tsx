import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../types/Todo';
import useTodoDetails from '../hooks/useTodoDetails';

type TodoDetailsProps = {
  todos: Todo[];
  onUpdate: (id: number, title: string, description: string, isCompleted: boolean) => void;
};

const TodoDetails: React.FC<TodoDetailsProps> = ({ todos, onUpdate }) => {
  const navigate = useNavigate();
  const todo = useTodoDetails(todos);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');

  if (!todo) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-2xl max-w-lg mx-auto">
        <p className="text-lg text-gray-600">Todo not found</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 bg-blue-500 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Back
        </button>
      </div>
    );
  }

  const handleSave = () => {
    onUpdate(todo.id, title, description, todo.isCompleted);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg max-w-2xl mx-auto mt-8 p-6 sm:p-8 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 truncate" title={todo.title}>
          {isEditing ? "Edit Todo" : todo.title}
        </h2>
        {!isEditing && (
          <p className="text-gray-600 overflow-hidden max-h-20 break-words" style={{ whiteSpace: 'pre-line' }}>
            {todo.description}
          </p>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Description"
          />
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-green-500 text-white py-2 px-8 rounded-lg shadow-md hover:bg-green-600 transition text-lg"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full sm:w-auto bg-gray-500 text-white py-2 px-8 rounded-lg shadow-md hover:bg-gray-600 transition text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <p className="text-lg font-medium text-gray-700">
            Status: <span className={todo.isCompleted ? "text-green-500" : "text-yellow-500"}>
              {todo.isCompleted ? "Completed" : "Pending"}
            </span>
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-yellow-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition ml-6"
            >
              Edit
            </button>
            <button
              onClick={() => navigate('/todos')}
              className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetails;
