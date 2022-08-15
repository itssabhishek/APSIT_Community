import { DRAWER_OPEN, DRAWER_CLOSE } from "../constants/drawerState";

export const drawerReducer = (
  state = {
    drawerState: false,
  },
  action
) => {
  switch (action.type) {
    case DRAWER_OPEN:
      return {
        ...state,
        drawerState: action.payload.drawerState,
      };
    case DRAWER_CLOSE:
      return {
        ...state,
        drawerState: false,
      };

    default:
      return state;
  }
};
