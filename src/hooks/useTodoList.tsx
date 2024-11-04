import { useState } from 'react';
import { Todo } from '../types/Todo';

const useTodoList = (
    todos: Todo[],
    onAddTodo: (title: string, description: string) => void,
    onUpdateTodo: (id: number, title: string, description: string, isComplete: boolean) => void, // Actualizado para aceptar 4 argumentos
    onDeleteTodo: (id: number) => void,
    isLoading: boolean
) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTodo(title, description);
        setTitle('');
        setDescription('');
    };

    // Modificación de `handleCompleteToggle` para aceptar y pasar todos los argumentos
    const handleCompleteToggle = (id: number, title: string, description: string, isComplete: boolean) => {
        onUpdateTodo(id, title, description, isComplete);
    };

    return {
        title,
        description,
        handleTitleChange,
        handleDescriptionChange,
        handleSubmit,
        handleCompleteToggle, // Exponemos la función para marcar como completo
        todos,
        onDeleteTodo,
        isLoading
    };
};

export default useTodoList;
