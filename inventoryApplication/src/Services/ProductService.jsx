import axios from 'axios';

const PROD_URL = "http://localhost:9191/invent/product";
const ID_URL = "http://localhost:9191/invent/id-gen";
const VEND_URL = "http://localhost:9191/invent/vendor";

// GET ALL PRODUCTS
export const displayAllProducts = () => {
  return axios.get(PROD_URL, { withCredentials: true });
};

// SAVE PRODUCT
export const saveNewProduct = (product) => {
  return axios.post(PROD_URL, product, { withCredentials: true });
};

// GET PRODUCT BY ID
export const getProductById = (id) => {
  return axios.get(`${PROD_URL}/${id}`, { withCredentials: true });
};

// DELETE PRODUCT
export const deleteAProduct = (id) => {
  return axios.delete(`${PROD_URL}/${id}`, { withCredentials: true });
};

// EDIT STOCK
export const editProductStock = (product, qty, flag) => {
  return axios.put(`${PROD_URL}/${qty}/${flag}`, product, {
    withCredentials: true
  });
};

// EDIT PRICE
export const editProductPrice = (product) => {
  return axios.put(PROD_URL, product, { withCredentials: true });
};

// GENERATE PRODUCT ID
export const productIdGenerator = () => {
  return axios.get(ID_URL, { withCredentials: true });
};

// GET PRODUCTS BY LOGGED-IN VENDOR
export const getProductByAVendor = () => {
  return axios.get(VEND_URL, { withCredentials: true });
};

// GET PRODUCTS BY VENDOR ID
export const getProductByVendor = (id) => {
  return axios.get(`${VEND_URL}/${id}`, { withCredentials: true });
};

// ✅ NEW: PRODUCT DEMAND API
export const getProductDemand = (productId) => {
  return axios.get(
    `http://localhost:9191/invent/product/demand/${productId}`,
    { withCredentials: true }
  );
};