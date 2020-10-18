import axios from 'axios';

import { getData } from '../utils';

export const instance = axios.create({
  baseURL: 'https://qrder-web.herokuapp.com',
  timeout: 5000,
});

export function makeRequest(type, path, config = null) {
  console.warn("[Request]", type, path);
  return new Promise((resolve, reject) => {
    instance[type](path, config).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err.response || err);
    });
  });
}

export function makeRequestAuth(type, path, config = null) {
  console.warn("[Request]", type, path);
  return new Promise(async (resolve, reject) => {
    const token = await getData('token');
    //const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODVkNjlkYjctMmRhOS00ODNkLTliM2UtMTc1ZjMwOThlMWNlIiwiaWF0IjoxNjAyOTM5NjQ0fQ.ilOq2qna-WTR0iuXyKsItvX4VZL6BM7dL1UodIbWIHY';
    instance[type](path, {
      ...config,
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' }
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err.response || err);
    });
  });
}