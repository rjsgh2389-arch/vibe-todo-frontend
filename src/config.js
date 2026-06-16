export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://vibebackend-a8af86818dd7.herokuapp.com';

export const API_URL = `${API_BASE_URL.replace(/\/$/, '')}/todos`;
