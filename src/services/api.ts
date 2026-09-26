const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Todo {
  id: number;
  title: string;
  status: boolean;
  created_at: string;
}

export interface CreateTodo {
  title: string;
  status?: boolean;
}

export interface UpdateTodo {
  title?: string;
  status?: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/api/todos/`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/api/todos/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todo');
  }
  return response.json();
};

export const createTodo = async (todo: CreateTodo): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/api/todos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (id: number, todo: UpdateTodo): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json();
};
