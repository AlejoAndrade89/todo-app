import { useState } from 'react';

const useTodoForm = (initialTitle = '', initialDescription = '') => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

    const resetForm = () => {
        setTitle('');
        setDescription('');
    };

    return {
        title,
        description,
        handleTitleChange,
        handleDescriptionChange,
        resetForm,
    };
};

export default useTodoForm;
