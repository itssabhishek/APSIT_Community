import { DRAWER_OPEN } from "../constants/drawerState";

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
