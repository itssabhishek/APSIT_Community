import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SIGN_IN_FAILED,
} from "../constants/authState";

export const authReducer = (
  state = {
    name: "",
    moodleId: "",
  },
  action
) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        moodleId: action.payload.moodleId,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        name: "",
        moodleId: "",
      };

    case SIGN_IN_FAILED:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
