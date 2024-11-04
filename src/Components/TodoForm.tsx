import React, { useState } from 'react';

type TodoFormProps = {
  onSubmit: (title: string, description: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
