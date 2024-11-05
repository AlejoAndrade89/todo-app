import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import TodoListView from './components/TodoListView';
import useTodos from './hooks/useTodos';

const App: React.FC = () => {
  const { todos, isLoading, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useTodos();

  return (
    <div className="ontainer mx-auto px-4 py-8 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl bg-white shadow-xl rounded-lg">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <TodoList
                todos={todos}
                onAddTodo={handleAddTodo}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo}
                isLoading={isLoading}
              />
              {/* Enlace "Ver Lista de Tareas" solo se muestra en la página principal */}
              <Link to="/todos" className="text-blue-500 underline mb-4 block text-center">Ver Lista de Tareas</Link>
            </>
          } 
        />
        <Route path="/todos" element={<TodoListView todos={todos} />} />
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
