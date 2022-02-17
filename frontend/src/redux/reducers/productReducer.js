import {
  PRODUCT_START,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  REVIEW_START,
  REVIEW_SUCCESS,
  REVIEW_RESET,
  REVIEW_FAIL,
  ADMIN_PRODUCT_START,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_CREATE_START,
  ADMIN_PRODUCT_CREATE_SUCCESS,
  ADMIN_PRODUCT_CREATE_FAIL,
  ADMIN_PRODUCT_CREATE_RESET,
  ADMIN_PRODUCT_DELETE_START,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAIL,
  ADMIN_PRODUCT_DELETE_RESET,
  ADMIN_PRODUCT_UPDATE_START,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
  ADMIN_PRODUCT_UPDATE_RESET,
  ALL_REVIEW_START,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_START,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERROR,
} from "../const/productConst";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_START:
    case ADMIN_PRODUCT_START:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        productPerPage: action.payload.productPerPage,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_START:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_START:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_CREATE_START:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case ADMIN_PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_PRODUCT_CREATE_RESET:
      return {
        ...state,
        success: false,
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

//Delete Product --Admin
export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_DELETE_START:
    case ADMIN_PRODUCT_UPDATE_START:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case ADMIN_PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case ADMIN_PRODUCT_DELETE_FAIL:
    case ADMIN_PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_PRODUCT_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case ADMIN_PRODUCT_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
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

//All Review For-----Admin
export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_START:
      return {
        loading: true,
        ...state,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
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

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
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
