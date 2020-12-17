export const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        token: action.token,
        loading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        token: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        token: null,
        user: null
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const restaurantReducer = (prevState, action) => {
  switch (action.type) {
    case 'READ_QR':
      return {
        ...prevState,
        qr: action.qr,
        basketSize: 0,
      };
    case 'PAYMENT_DONE':
      return {
        ...prevState,
        qr: null,
        basketSize: 0,
        activeOrder: false,
      };
    case 'LEAVE_RESTAURANT':
      return {
        ...prevState,
        qr: null,
        basketSize: 0,
        activeOrder: false,
      };
    case 'UPDATE_BASKET':
      return {
        ...prevState,
        basketSize: action.basketSize
      }
    case 'UPDATE_ORDER':
      return {
        ...prevState,
        activeOrder: action.activeOrder
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
