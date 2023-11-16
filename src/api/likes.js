import axios from './axios';

export const getLikesRequest = () => axios.get('/likes/');
export const createLikeRequest = (like) => axios.post('/likes/', like);
export const deleteLikeRequest = (id) => axios.delete(`/likes/${id}/`);
export const getLikeRequest = (id) => axios.get(`/likes/${id}/`);
