const HEROKU_API_URL = 'https://vibebackend-a8af86818dd7.herokuapp.com';

function getApiBaseUrl() {
  // Vercel 배포: same-origin 프록시(vercel.json)로 CORS 우회
  // VITE_API_URL이 Vercel에 설정돼 있어도 PROD에서는 상대 경로 사용
  if (import.meta.env.PROD) {
    return '';
  }

  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }

  return HEROKU_API_URL;
}

export const API_BASE_URL = getApiBaseUrl();
export const API_URL = API_BASE_URL ? `${API_BASE_URL}/todos` : '/todos';
