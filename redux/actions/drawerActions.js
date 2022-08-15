import { DRAWER_OPEN, DRAWER_CLOSE } from "../constants/drawerState";

export const toggleDrawerState =
  ({ drawerState }) =>
  (dispatch) => {
    dispatch({
      type: DRAWER_OPEN,
      payload: {
        drawerState: drawerState,
      },
    });
  };
