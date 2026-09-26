import React, { useState } from 'react';
import { createTodo } from '../services/api';

interface AddTodoProps {
  onAdd: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!title.trim()) return;
      await createTodo({ title });
      setTitle('');
      onAdd();
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
