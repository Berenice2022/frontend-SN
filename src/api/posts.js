import axios from './axios';

export const getPostsRequest = () => axios.get('/posts/');
export const getPostRequest = (id) => axios.get(`/posts/${id}/`);
export const createPostRequest = (post) => axios.post('/posts/', post);
export const updatePostRequest = (id, post) => axios.put(`/posts/${id}/`, post);
export const deletePostRequest = (id) => axios.delete(`/posts/${id}/`);
//, { 'Content-Type': 'multipart/form-data' }
