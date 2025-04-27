import axios from 'axios';

const API_URL = 'http://localhost:8080/api/complete';

export const sendPayment = async (paymentData) => {
  const response = await axios.post(API_URL, paymentData);
  return response.data;
};