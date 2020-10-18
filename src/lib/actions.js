import { makeRequest, makeRequestAuth } from "./clients/axios";

// private
function middleware(auth, callback) {
  return new Promise((resolve, reject) => {
    callback.then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
}

// GET:/
export async function getHealth() {
  return makeRequestAuth("get", "/");
}

// POST:/user/login
export async function postUserLogin(data) {
  const { username, password } = data;

  return makeRequest("post", "/user/login", {
    username,
    password
  });
}

// POST:/user/register
export async function postUserRegister(data) {
  const { name, surname, email, username, password } = data;

  return makeRequest("post", "/user/register", {
    name,
    surname,
    email,
    username,
    password
  });
}

// GET:/user/me
export async function getUserMe() {
  return makeRequestAuth("get", "/user/me");
}