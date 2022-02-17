import {
  CREAT_ORDER_START,
  CREAT_ORDER_SUCCESS,
  CREAT_ORDER_FAIL,
  GET_MY_ORDER_START,
  GET_MY_ORDER_SUCCESS,
  GET_MY_ORDER_FAIL,
  CLEAR_ERROR,
  GET_MY_ORDER_DETAILS_START,
  GET_MY_ORDER_DETAILS_SUCCESS,
  GET_MY_ORDER_DETAILS_FAIL,
  GET_ALL_ORDER_START,
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_FAIL,
  UPDATE_ORDER_START,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_START,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../const/orderConst";
import axios from "axios";

// Create Order--user
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREAT_ORDER_START });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: CREAT_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREAT_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders --user
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ORDER_START });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({ type: GET_MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Gett All Orders --Admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDER_START });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({ type: GET_ALL_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Updatee Order--Admin
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_START });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order--Admin
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_START });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details --Admin
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ORDER_DETAILS_START });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({ type: GET_MY_ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
