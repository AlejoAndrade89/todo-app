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
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={handleCompleteToggle}>
        {todo.isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
