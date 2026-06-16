import { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import * as todoApi from './api/todos';
import './App.css';

export { API_URL } from './config';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = useCallback(async () => {
    try {
      setError('');
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function handleAdd(title) {
    try {
      setError('');
      const newTodo = await todoApi.createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleUpdate(id, updates) {
    try {
      setError('');
      const updated = await todoApi.updateTodo(id, updates);
      setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function handleDelete(id) {
    try {
      setError('');
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>할 일 목록</h1>
          <p className="subtitle">
            {todos.length > 0
              ? `${remaining}개 남음 · 전체 ${todos.length}개`
              : '오늘 할 일을 추가해보세요'}
          </p>
        </header>

        <TodoForm onAdd={handleAdd} />

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="status">불러오는 중...</p>
        ) : todos.length === 0 ? (
          <p className="status empty">등록된 할 일이 없습니다.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
