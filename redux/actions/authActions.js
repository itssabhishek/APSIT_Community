import { USER_LOGGED_IN, SIGN_IN_FAILED } from "../constants/authState";

// Check credentials and get user's name and moodleID
export const getUserDetails =
  ({ name, moodleId }) =>
  (dispatch) => {
    dispatch({
      type: USER_LOGGED_IN,
      payload: {
        name: name,
        moodleId: moodleId,
      },
    });
  };
