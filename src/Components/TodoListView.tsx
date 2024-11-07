import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Todo } from "../types/Todo";

type TodoListViewProps = {
  todos: Todo[];
};

const TodoListView: React.FC<TodoListViewProps> = ({ todos }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Task list
      </h2>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                {todo.title}
              </h3>
              <p className="text-gray-600 mb-4 max-h-16 overflow-y-auto break-words">
                {todo.description}
              </p>
              <div className="flex justify-center">
                <Link
                  to={`/todos/${todo.id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  See Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition mt-8"
      >
        Back
      </button>
    </div>
  );
};

export default TodoListView;
