const HEROKU_API_URL = 'https://vibebackend-a8af86818dd7.herokuapp.com';

function getApiBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }

  // Vercel 배포: same-origin 프록시(vercel.json)로 CORS 우회
  if (import.meta.env.PROD) {
    return '';
  }

  return HEROKU_API_URL;
}

export const API_BASE_URL = getApiBaseUrl();
export const API_URL = API_BASE_URL ? `${API_BASE_URL}/todos` : '/todos';
