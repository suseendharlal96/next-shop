import axios from "axios";

import * as actionType from "./actionType";

export const signin = (formData, router) => async (dispatch) => {
  dispatch({ type: actionType.AUTH });
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/user/signin",
      formData
    );
    console.log(data);
    dispatch({ type: actionType.AUTH_SUCCESS, payload: data });
    router.push("/");
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL, payload: error?.response?.data });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  dispatch({ type: actionType.AUTH });
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/user/signup",
      formData
    );
    dispatch({ type: actionType.AUTH_SUCCESS, payload: data });
    router.push("/");
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL, payload: error?.response?.data });
  }
};
