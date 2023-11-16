import axios from './axios';

export const getInterestsRequest = () => axios.get('/interests/');
export const getInterestRequest = (id) => axios.get(`/interests/${id}/`);
export const createInterestRequest = (interest) =>
  axios.post('/interests/', interest);
export const updateInterestRequest = (id, interest) =>
  axios.put(`/interests/${id}/`, interest);
export const deleteInterestRequest = (id) => axios.delete(`/interests/${id}/`);
