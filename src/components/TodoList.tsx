import React, { useEffect, useState } from 'react';
import { Todo, fetchTodos } from '../services/api';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodosData = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  const handleAdd = () => {
    fetchTodosData();
  };

  const handleUpdate = () => {
    fetchTodosData();
  };

  const handleDelete = () => {
    fetchTodosData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo onAdd={handleAdd} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
