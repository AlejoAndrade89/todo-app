import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import useTodos from './hooks/useTodos';

const App: React.FC = () => {
  const { todos, isLoading, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();

  return (
    <div className="container mx-auto px-4 py-8 max-w-md bg-white shadow-xl rounded-lg">
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
        <Route 
          path="/todos/:id" 
          element={<TodoDetails todos={todos} />} 
        />
      </Routes>
    </div>
  );
};

export default App;
