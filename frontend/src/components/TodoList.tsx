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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="header">
        <h1>Tasks</h1>
        <p className="count">{todos.filter(t => !t.status).length} remaining</p>
      </div>
      <div className="listSurface">
        {todos.length === 0 ? (
          <div className="emptyState">
            <p>No tasks yet</p>
            <p>Add a task below to get started.</p>
          </div>
        ) : (
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
        )}
      </div>
      <div className="addTodoWrapper">
        <AddTodo onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default TodoList;
