import React, { useState, useEffect } from 'react';
import TodoItem from './Components/TodoItem';

type Todo = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5059/api/todo');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error en fetchTodos:", error);
    }
  };

  const addTodo = async () => {
    const newTodo = { title: newTitle, description: newDescription, isCompleted: false };

    try {
      const response = await fetch('http://localhost:5059/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const data = await response.json();
      setTodos([...todos, data]);
      setNewTitle('');
      setNewDescription('');
    } catch (error) {
      console.error("Error en addTodo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5059/api/todo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error en deleteTodo:", error);
    }
  };

  const toggleTodo = async (id: number, title: string, description: string, updatedIsCompleted: boolean) => {
    const updatedTodo = { id, title, description, isCompleted: updatedIsCompleted };

    try {
      const response = await fetch(`http://localhost:5059/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error en toggleTodo:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">TODO List</h1>
        
        <div className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addTodo}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-4">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              isCompleted={todo.isCompleted}
              onDelete={deleteTodo}
              onEdit={(id, title, description) => toggleTodo(id, title, description, !todo.isCompleted)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
