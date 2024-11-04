import { useCallback } from 'react';
import { updateTodo, deleteTodo } from '../services/todoService';
import { Todo } from '../types/Todo';

const useTodoItem = (todo: Todo, onUpdate: (updatedTodo: Todo) => void, onDelete: (id: number) => void) => {
  const handleCompleteToggle = useCallback(async () => {
    try {
      const result = await updateTodo(todo.id, { isComplete: !todo.isComplete });
      onUpdate(result.data);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }, [todo, onUpdate]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }, [todo, onDelete]);

  return { handleCompleteToggle, handleDelete };
};

export default useTodoItem;
