import axios from './axios';

export const getInfoProfilesRequest = () => axios.get('/infoprofiles');
export const getInfoProfileRequest = (id) => axios.get(`/infoprofiles/${id}`);
export const createInfoProfileRequest = (infoprofile) => axios.post('/infoprofiles', infoprofile);
export const updateInfoProfileRequest = (id,infoprofile) => axios.put(`/infoprofiles/${id}`,infoprofile);
export const deleteInfoProfileRequest = (id) => axios.delete(`/infoprofiles/${id}`);




