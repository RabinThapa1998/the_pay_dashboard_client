export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1/dashboard'
    : process.env.BASE_URL;
