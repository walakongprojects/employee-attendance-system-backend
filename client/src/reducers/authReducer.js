import { SET_CURRENT_USER, GET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) 
  {
    case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user
        }
    case GET_CURRENT_USER:
        return state;
    default:
        return state;
  }
}