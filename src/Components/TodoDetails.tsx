import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../types/Todo';
import useTodoDetails from '../hooks/useTodoDetails';

type TodoDetailsProps = {
  todos: Todo[];
  onUpdate: (updatedTodo: Todo) => void;
};

const TodoDetails: React.FC<TodoDetailsProps> = ({ todos, onUpdate }) => {
  const navigate = useNavigate();
  const todo = useTodoDetails(todos);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');

  if (!todo) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <p className="text-lg text-gray-600">Todo not found</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
          Back
        </button>
      </div>
    );
  }

  const handleSave = () => {
    onUpdate({ ...todo, title, description });
    setIsEditing(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto text-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button onClick={handleSave} className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">
            Save
          </button>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">{todo.title}</h2>
          <p className="text-lg text-gray-600 mb-2">{todo.description}</p>
          <p className={`text-xl font-semibold mb-4 ${todo.isComplete ? 'text-green-500' : 'text-yellow-500'}`}>
            {todo.isComplete ? 'Completed' : 'Pending'}
          </p>
          <button onClick={() => setIsEditing(true)} className="mt-4 bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600">
            Edit
          </button>
        </>
      )}
      <button onClick={() => navigate('/')} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
        Back
      </button>
    </div>
  );
};

export default TodoDetails;
