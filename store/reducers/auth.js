import { HYDRATE } from "next-redux-wrapper";
import * as actionType from "../actions/actionType";
const initState = {
  authData: null,
  loading: false,
  errors: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case actionType.AUTH:
      return {
        ...state,
        loading: true,
        authData: null,
        errors: null,
      };

    case actionType.AUTH_SUCCESS:
      console.log(action.payload);
      document.cookie = `${action?.payload?.token}`;
      localStorage.setItem("token", action?.payload?.token);
      return {
        ...state,
        authData: action.payload.result,
        loading: false,
        errors: null,
      };

    case actionType.AUTH_FAIL:
      return {
        ...state,
        authData: null,
        loading: false,
        errors: action.payload,
      };

    case actionType.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        errors: null,
      };

    default:
      return state;
  }
};

export default authReducer;
