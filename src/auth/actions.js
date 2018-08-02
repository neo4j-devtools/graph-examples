import * as Types from './action.types';

export function getUserSuccess(user) {
  return { type: Types.USER_GET_SUCCESS, user};
}

export function getUserFailure(error) {
  return { type: Types.USER_GET_FAILURE, error };
}

export function clearUser() {
  return { type: Types.USER_CLEAR };
}
