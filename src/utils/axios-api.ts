import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const axiosAPI = axios.create({
  baseURL: apiUrl,
});

export const endpoints = {
  applicants: {
    root: '/applicants',
    detail: (id: string) => `/applicants/${id}`,
  },
  roles: {
    list: '/roles/list',
  },
  statuses: {
    list: '/statuses/list',
  },
};
