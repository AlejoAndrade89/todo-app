import React, { useState } from 'react';
import { addTodo } from '../api/todos';

interface TodoFormProps {
    onAdd: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTodo({
            title,
            description,
            isComplete: false,
            id: 0
        });
        setTitle('');
        setDescription('');
        onAdd();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow mb-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="p-2 border border-gray-300 rounded w-full mb-2"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
        </form>
    );
};

export default TodoForm;
