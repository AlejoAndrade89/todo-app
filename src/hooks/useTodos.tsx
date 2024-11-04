import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { getTodo, addTodo, deleteTodo } from '../services/todoService';

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
        const newTodo = { title, description, isComplete: false };
        try {
            const response = await addTodo(newTodo);
            setTodos([...todos, response.data]);
        } catch (error) {
            console.error("Error al agregar el TODO:", error);
        }
    };

    const handleUpdateTodo = (id: number, title: string, description: string, isComplete: boolean) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, title, description, isComplete } : todo)));
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
