import React, { useState } from 'react';

type TodoItemProps = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedTitle: string, updatedDescription: string, updatedIsCompleted: boolean) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, isCompleted, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      setError('Title and description cannot be empty.');
      return;
    }

    onEdit(id, editTitle, editDescription, isCompleted);
    setIsEditing(false);
    setError(''); // Clear error message on successful save
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditDescription(description);
    setError(''); // Clear error message on cancel
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-2 shadow">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="p-1 mb-2 w-full border rounded"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="p-1 mb-2 w-full border rounded"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button onClick={handleSave} className="p-1 bg-blue-500 text-white rounded mr-2">
            Save
          </button>
          <button onClick={handleCancel} className="p-1 bg-gray-300 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : ''}`}>{title}</h3>
              <p className={`text-sm ${isCompleted ? 'line-through text-gray-400' : ''}`}>{description}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="p-1 text-sm font-semibold rounded bg-blue-500 text-white">
              Edit
            </button>
            <button
              onClick={() => onEdit(id, title, description, !isCompleted)} // Alterna el estado de isCompleted
              className={`p-1 text-sm font-semibold rounded ${isCompleted ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
            >
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
          <button onClick={() => onDelete(id)} className="mt-2 p-1 bg-red-500 text-white rounded w-full">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
