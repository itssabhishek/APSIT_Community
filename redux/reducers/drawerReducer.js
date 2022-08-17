import { DRAWER_OPEN } from "../constants/drawerState";

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

    default:
      return state;
  }
};
