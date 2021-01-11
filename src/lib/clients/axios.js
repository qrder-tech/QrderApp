import axios from 'axios';

import { getData } from '../utils';

export const instance = axios.create({
  baseURL: 'https://qrder-web.herokuapp.com',
  timeout: 5000,
});

export function makeRequest(type, path, data = null) {
  console.warn('[Request]', type, path);
  console.log('[Request]', type, path, data);

  return new Promise((resolve, reject) => {
    instance[type](path, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response || err);
      });
  });
}

export function makeRequestAuth(type, path, data = null) {
  console.warn('[Request]', type, path);
  console.log('[Request]', type, path, data);

  return new Promise(async (resolve, reject) => {
    const token = await getData('token');
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODVkNjlkYjctMmRhOS00ODNkLTliM2UtMTc1ZjMwOThlMWNlIiwiaWF0IjoxNjAyOTM5NjQ0fQ.ilOq2qna-WTR0iuXyKsItvX4VZL6BM7dL1UodIbWIHY';

    instance(path, {
      method: type,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response || err);
      });
  });
}
