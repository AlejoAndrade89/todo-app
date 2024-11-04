import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../types/Todo';
import useTodoDetails from '../hooks/useTodoDetails';

type TodoDetailsProps = {
  todos: Todo[];
};

const TodoDetails: React.FC<TodoDetailsProps> = ({ todos }) => {
  const navigate = useNavigate();
  const todo = useTodoDetails(todos);

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

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{todo.title}</h2>
      <p className="text-lg text-gray-600 mb-2">{todo.description}</p>
      <p className={`text-xl font-semibold mb-4 ${todo.isComplete ? 'text-green-500' : 'text-yellow-500'}`}>
        {todo.isComplete ? 'Completed' : 'Pending'}
      </p>
      <button onClick={() => navigate('/')} className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
        Back
      </button>
    </div>
  );
};

export default TodoDetails;
