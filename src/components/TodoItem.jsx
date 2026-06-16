import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    if (loading) return;
    setLoading(true);
    try {
      await onUpdate(todo._id, { completed: !todo.completed });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const trimmed = editTitle.trim();
    if (!trimmed || trimmed === todo.title) {
      setEditing(false);
      setEditTitle(todo.title);
      return;
    }

    setLoading(true);
    try {
      await onUpdate(todo._id, { title: trimmed });
      setEditing(false);
    } catch {
      setEditTitle(todo.title);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setEditing(false);
    setEditTitle(todo.title);
  }

  async function handleDelete() {
    if (loading) return;
    setLoading(true);
    try {
      await onDelete(todo._id);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${loading ? 'loading' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={loading || editing}
        aria-label="완료 상태 변경"
      />

      {editing ? (
        <input
          className="todo-edit-input"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={loading}
        />
      ) : (
        <span className="todo-title" onDoubleClick={() => setEditing(true)}>
          {todo.title}
        </span>
      )}

      <div className="todo-actions">
        {editing ? (
          <>
            <button type="button" onClick={handleSave} disabled={loading}>
              저장
            </button>
            <button type="button" className="secondary" onClick={handleCancel} disabled={loading}>
              취소
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setEditing(true)} disabled={loading}>
              수정
            </button>
            <button type="button" className="danger" onClick={handleDelete} disabled={loading}>
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}
