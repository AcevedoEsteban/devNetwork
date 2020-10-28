import { SET_ALERT, REMOVE_ALERT } from '../action/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // state never changes but its copy can
      // aslo the data is aka payload
      return [...state, payload];
    case REMOVE_ALERT:
      // the payload in this case is just the id

      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
