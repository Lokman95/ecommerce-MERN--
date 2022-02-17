import {
  CREAT_ORDER_START,
  CREAT_ORDER_SUCCESS,
  CREAT_ORDER_FAIL,
  GET_MY_ORDER_START,
  GET_MY_ORDER_SUCCESS,
  GET_MY_ORDER_FAIL,
  GET_MY_ORDER_DETAILS_START,
  GET_MY_ORDER_DETAILS_SUCCESS,
  GET_MY_ORDER_DETAILS_FAIL,
  GET_ALL_ORDER_START,
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_FAIL,
  UPDATE_ORDER_START,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_START,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  CLEAR_ERROR,
} from "../const/orderConst";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREAT_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case CREAT_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREAT_ORDER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MY_ORDER_START:
      return {
        loading: true,
      };
    case GET_MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_MY_ORDER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Admin
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ORDER_START:
      return {
        loading: true,
      };
    case GET_ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case GET_ALL_ORDER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Admin
export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_START:
    case DELETE_ORDER_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_MY_ORDER_DETAILS_START:
      return {
        loading: true,
      };
    case GET_MY_ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case GET_MY_ORDER_DETAILS_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
