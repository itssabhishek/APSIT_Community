import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SIGN_IN_FAILED,
} from "../constants/authState";

export const authReducer = (
  state = {
    name: "",
    moodleID: "",
  },
  action
) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        moodleID: action.payload.moodleID,
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        name: "",
        moodleID: "",
      };

    case SIGN_IN_FAILED:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
