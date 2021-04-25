import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:3000/api'; //for Web page
axios.defaults.baseURL = 'http://10.0.0.121:3000/api';

export const getPosts = async () => {
    const response = await axios.get('/posts', {withCredentials: true});
    return response.data;
};

export const userLogout = async () => {
    const response = await axios.get('/logout', {withCredentials: true});
    return response.data;
}

export const getAuthUser = async () => {
    const response = await axios.get('/user', {withCredentials: true});
    return response.data;
}

export const getDoctorList = async()=>{
    const response = await axios.get('/allDoctors')
    return response.data;

}
export default {
    getPosts,
    userLogout,
    getAuthUser,
    getDoctorList
};