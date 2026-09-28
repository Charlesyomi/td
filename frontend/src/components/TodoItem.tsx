import React, { useState } from 'react';
import { Todo, updateTodo, deleteTodo } from '../services/api';
import styles from './TodoItem.module.css';

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
    <li 
      className={styles.row} 
      data-status={status ? 'done' : 'open'}
    >
      {isEditing ? (
        <div className={styles.editMode}>
          <input
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Todo title"
          />
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <button 
            className={`${styles.button} ${styles.save}`}
            onClick={handleUpdate}
            aria-label={`Save ${todo.title}`}
          >
            Save
          </button>
          <button 
            className={styles.button}
            onClick={() => setIsEditing(false)}
            aria-label={`Cancel ${todo.title}`}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={status}
            onChange={async (e) => {
              const newStatus = e.target.checked;
              setStatus(newStatus);
              await updateTodo(todo.id, { status: newStatus });
              onUpdate();
            }}
            aria-label={`Mark completed: ${todo.title}`}
          />
          <span className={styles.title}>
            {todo.title}
          </span>
          <button 
            className={styles.button}
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${todo.title}`}
          >
            Edit
          </button>
          <button 
            className={`${styles.button} ${styles.delete}`}
            onClick={handleDelete}
            aria-label={`Delete ${todo.title}`}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
