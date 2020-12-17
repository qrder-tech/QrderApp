import { makeRequest, makeRequestAuth } from './clients/axios';
import { reduceError, getData, reduceObj } from './utils';

// todo: remove async keyword
// todo: remove deconstructions and pass the parameters directly

// private
function middleware(auth, callback) {
  return new Promise((resolve, reject) => {
    callback
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(reduceError(err));
        reject(err.data || err);
      });
  });
}

// GET:/
export async function getHealth() {
  return makeRequestAuth('get', '/');
}

// POST:/user/login?type=
export async function postUserLogin(data) {
  const { username, password } = data;

  return makeRequest('post', '/auth/login?type=user', {
    username,
    password,
  });
}

// POST:/user/registration?type=
export async function postUserRegister(data) {
  const { name, surname, email, username, password } = data;

  return makeRequest('post', '/auth/registration?type=user', {
    name,
    surname,
    email,
    username,
    password,
  });
}

// GET:/user/me
export async function getUserMe() {
  return middleware(true, makeRequestAuth('get', '/user/me'));
}

// GET:/user/orders
export async function getUserOrders() {
  return middleware(true, makeRequestAuth('get', '/user/orders'));
}

// GET:/restaurant?uuid=
export async function getRestaurantUuid(data) {
  const { uuid } = data;

  return makeRequestAuth('get', '/restaurant?uuid='.concat(uuid));
}

// GET:/order
export async function getOrder(data) {
  const { uuid } = data;
  return middleware(true, makeRequestAuth('get', '/order?uuid='.concat(uuid)));
}

// POST:/order/new
export async function postOrderNew(data) {
  const qr = await getData('qr');
  const { restaurantUuid, tableUuid } = await JSON.parse(qr);

  const items = await data.map(m => reduceObj(m, ['uuid', 'metadata', 'quantity']));
  return middleware(true, makeRequestAuth('post', '/order/new', {
    restaurantUuid,
    tableUuid,
    items,
    userUuid: "3d9b7b60-741f-45aa-b94a-68daa30b7ea6"
  }));
}