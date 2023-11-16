import axios from './axios';

//const URL='http://localhost:4000/api';

export const registerRequest = (user) => axios.post('/register', user);

export const loginRequest = (user) => axios.post('/login', user);

export const verifyTokenRequest = () => axios.get('/verify');

//export const logoutRequest = ()=> axios.post('logout');

export const getUserRequest = (id) => axios.get(`/users${id}/`);

export const getUsersRequest = () => axios.get('/users');
