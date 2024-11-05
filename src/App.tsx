import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import TodoListView from './components/TodoListView'; // Nuevo componente para ver la lista completa de tareas
import useTodos from './hooks/useTodos';

const App: React.FC = () => {
  const { todos, isLoading, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();

  return (
    <div className="container mx-auto px-4 py-8 max-w-md bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">My Todo List</h1>
      <Link to="/todos" className="text-blue-500 underline mb-4 block text-center">Ver Lista de Tareas</Link> {/* Nuevo botón */}
      <Routes>
        <Route 
          path="/" 
          element={
            <TodoList
              todos={todos}
              onAddTodo={handleAddTodo}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
              isLoading={isLoading}
            />
          } 
        />
        <Route path="/todos" element={<TodoListView todos={todos} />} /> {/* Nueva vista para la lista de tareas */}
        <Route 
          path="/todos/:id" 
          element={
            <TodoDetails 
              todos={todos} 
              onUpdate={handleUpdateTodo}
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
