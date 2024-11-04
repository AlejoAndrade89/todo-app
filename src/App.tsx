import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import useTodos from './hooks/useTodos';

const App: React.FC = () => {
  // Using custom hook to manage todos and loading state
  const { todos, isLoading, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();

  return (
    <div className="container mx-auto px-4 py-8 max-w-md bg-white shadow-xl rounded-lg">
      {/* Define routes for main list and details view */}
      <Routes>
        {/* Main list view route */}
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
        {/* Details view route */}
        <Route 
          path="/todos/:id" 
          element={
            <TodoDetails 
              todos={todos} 
              onUpdate={handleUpdateTodo}  // Pass handleUpdateTodo as onUpdate to TodoDetails
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
