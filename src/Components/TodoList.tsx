import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { getTodo, updateTodo, deleteTodo } from '../api/todos';

interface Todo {
    id: number;
    title: string;
    description: string;
    isComplete: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodo();
            setTodos(response.data);
        } catch (error) {
            console.error("Error al cargar las tareas:", error);
        }
    };

    const handleEdit = async (id: number, updatedTitle: string, updatedDescription: string, updatedIsComplete: boolean) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            const updatedTodo: Todo = {
                ...todo,
                title: updatedTitle,
                description: updatedDescription,
                isComplete: updatedIsComplete
            };
            try {
                await updateTodo(id, updatedTodo);
                fetchTodos();
            } catch (error) {
                console.error("Error al actualizar la tarea:", error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            fetchTodos();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    isCompleted={todo.isComplete}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default TodoList;
