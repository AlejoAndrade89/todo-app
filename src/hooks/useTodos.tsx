import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { getTodo, addTodo, deleteTodo, updateTodo } from '../services/todoService';

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            try {
                const response = await getTodo();
                setTodos(response.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
            setIsLoading(false);
        };
        fetchTodos();
    }, []);

    const handleAddTodo = async (title: string, description: string) => {
        const newTodo = { title, description, isCompleted: false };
        try {
            const response = await addTodo(newTodo);
            setTodos([...todos, response.data]);
        } catch (error) {
            console.error("Error al agregar el TODO:", error);
        }
    };

    // Updated handleUpdateTodo to make a request to update the backend as well
    const handleUpdateTodo = async (id: number, title: string, description: string, isCompleted: boolean) => {
        try {
            // Call the backend to persist the update
            await updateTodo(id, { title, description, isCompleted });
            // Update the local state only if the backend update is successful
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id? {...todo, isCompleted} : todo
        ));

        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return { todos, isLoading, handleAddTodo, handleUpdateTodo, handleDeleteTodo };
};

export default useTodos;
