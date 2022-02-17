import axios from "axios";
import {
  PRODUCT_START,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  REVIEW_START,
  REVIEW_SUCCESS,
  REVIEW_FAIL,
  ADMIN_PRODUCT_START,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_CREATE_START,
  ADMIN_PRODUCT_CREATE_SUCCESS,
  ADMIN_PRODUCT_CREATE_FAIL,
  ADMIN_PRODUCT_DELETE_START,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAIL,
  ADMIN_PRODUCT_UPDATE_START,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
  ALL_REVIEW_START,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_START,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERROR,
} from "../const/productConst";

// Get all products--- Users
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 5000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_START });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);

      dispatch({ type: PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_FAIL, payload: error.response.data.error });
    }
  };

// Get all products--- Admin
export const getProductAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_START });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create New product--- Admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_CREATE_START });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({ type: ADMIN_PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete product--- Admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_DELETE_START });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({ type: ADMIN_PRODUCT_DELETE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update product--- Admin
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_UPDATE_START });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({ type: ADMIN_PRODUCT_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get product details --user
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_START });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const addReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_START });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({ type: REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//All Reviews For ------Admin
export const allReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_START });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete Reviews For ------Admin
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_START });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
