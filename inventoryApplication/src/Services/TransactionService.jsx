import axios from 'axios';

const STOCK_URL = 'http://localhost:9191/invent/stock';
const TRANS_URL = 'http://localhost:9191/invent/trans';
const ID_URL = 'http://localhost:9191/invent/trans-id';
const ANA_URL = 'http://localhost:9191/invent/analysis';


// Save Transaction
export const saveTransaction = (transaction) => {
  return axios.post(TRANS_URL, transaction, {
    withCredentials: true
  });
}

// Find Transaction by ID
export const findTransactionById = (id) => {
  return axios.get(`${STOCK_URL}/${id}`, {
    withCredentials: true
  });
}

// Remove Transaction
export const removeTransactionById = (id) => {
  return axios.delete(`${STOCK_URL}/${id}`, {
    withCredentials: true
  });
}

// Generate Transaction ID
export const transactionIdGenerate = (flag) => {
  return axios.get(`${ID_URL}/${flag}`, {
    withCredentials: true
  });
}

// Find Transactions by Type
export const findTransactionsByType = (type) => {
  return axios.get(`${TRANS_URL}/${type}`, {
    withCredentials: true
  });
}


export const getDemandByProduct = (id) => {
  return axios.get(`${ANA_URL}/${id}`, {
    withCredentials: true
  });
}

export const getProductWiseTotalSale = () => {
  return axios.get(ANA_URL, {
    withCredentials: true
  });
}