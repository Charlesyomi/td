import React, { useState } from 'react';
import { Todo, updateTodo, deleteTodo } from '../services/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [status, setStatus] = useState(todo.status);

  const handleUpdate = async () => {
    try {
      await updateTodo(todo.id, { title, status });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      onDelete();
    }
    catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={status}
            onChange={async (e) => {
              const newStatus = e.target.checked;
              setStatus(newStatus);
              await updateTodo(todo.id, { status: newStatus });
              onUpdate();
            }}
          />
          <span style={{ textDecoration: status ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
