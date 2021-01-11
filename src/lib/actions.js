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

  return makeRequest('post', '/auth/login?type=consumer', {
    username,
    password,
  });
}

// POST:/user/registration?type=
export async function postUserRegister(data) {
  const { name, surname, email, phoneNumber, username, password } = data;

  return makeRequest('post', '/auth/registration?type=consumer', {
    name,
    surname,
    email,
    phoneNumber,
    username,
    password,
  });
}

// GET:/user/me
export async function getUserMe() {
  return middleware(true, makeRequestAuth('get', '/consumer/me'));
}

// POST:/user/me
export async function postUserMe(data) {
  const { name, surname, email, phoneNumber, username, password } = data;
  return middleware(true, makeRequestAuth('post', '/consumer/me', {
    name,
    surname,
    email,
    phoneNumber,
    username,
    password,
  }));
}

// POST:/user/wallet
export async function addBalance(data) {
  const { amount } = data;
  return middleware(true, makeRequestAuth('post', '/consumer/wallet', {
    amount
  }));
}

// GET:/user/offers
export async function getOffers() {
  return middleware(true, makeRequestAuth('get', '/consumer/offers'));
}

// GET:/user/favourites
export async function getFavourites() {
  return middleware(true, makeRequestAuth('get', '/consumer/favourites'));
}

// POST:/user/favourites
export async function addToFavourites(data) {
  const { restaurantUuid } = data;
  return middleware(true, makeRequestAuth('post', '/consumer/favourites', {
    restaurantUuid
  }));
}

// DELETE:/user/favourites
export async function removeFromFavourites(data) {
  const { restaurantUuid } = data;
  return middleware(true, makeRequestAuth('delete', '/consumer/favourites', {
    restaurantUuid
  }));
}

// GET:/restaurant?uuid=
export async function getRestaurantUuid(data) {
  const { uuid } = data;

  return makeRequestAuth('get', '/restaurant?uuid='.concat(uuid));
}

// GET:/order/all
export async function getOrderAll(scope = 'all') {
  return middleware(true, makeRequestAuth('get', '/order/all?scope='.concat(scope)));
}

// GET:/order
export async function getOrder(data) {
  const { uuid } = data;
  return middleware(true, makeRequestAuth('get', '/order?uuid='.concat(uuid)));
}

// POST:/order
export async function postOrder(data, uuid = null) {
  const qr = await getData('qr');
  const { restaurantUuid, tableUuid } = await JSON.parse(qr);

  const items = await data.map(m => reduceObj(m, ['uuid', 'options', 'quantity']));

  items.map(item => {
    item.options = item.options && item.options.split(';') || null;
    return item;
  });

  return middleware(true, makeRequestAuth('post', '/order'.concat(uuid && `?uuid=${uuid}` || ''), {
    restaurantUuid,
    tableUuid,
    items,
    userUuid: "3d9b7b60-741f-45aa-b94a-68daa30b7ea6"
  }));
}

// POST:/order/pay
export async function postOrderPay(uuid, data) {
  const { token } = data;

  return middleware(true, makeRequestAuth('post', '/order/pay?uuid='.concat(uuid), {
    token
  }));
}