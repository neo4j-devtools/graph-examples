import * as Types from './action.types';

export default function auth(state = getInitialState(), action) {
  switch (action.type) {
    case Types.USER_GET_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case Types.USER_GET_FAILURE:
    case Types.USER_CLEAR:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    user: null
  }
}
