import { API_URL } from '../config';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || '요청에 실패했습니다.');
  }

  return data;
}

export function getTodos() {
  return request(API_URL);
}

export function createTodo(title) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export function updateTodo(id, updates) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export function deleteTodo(id) {
  return request(`${API_URL}/${id}`, { method: 'DELETE' });
}
