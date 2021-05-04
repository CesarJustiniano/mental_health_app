import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:3000/api'; //for Web page
//axios.defaults.baseURL = 'http://10.0.0.75:3000/api'; //for mobile device & Web Page last
//axios.defaults.baseURL = 'exp://172.20.10.3:3000/api'; //for mobile device & Web Page
//axios.defaults.baseURL = 'http://10.0.0.64:3000/api'

axios.defaults.baseURL = 'http://192.168.0.19:3000/api';



//axios.defaults.baseURL = 'http://10.0.0.121:3000/api'; //for mobile device & Web Page
//axios.defaults.baseURL = 'http://10.0.0.65:19000/api'; //for mobile device & Web Page

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

export const getChatRoomList = async () => {
    const response = await axios.get('/chatRooms');
    return response.data;
}

export default {
    getPosts,
    userLogout,
    getAuthUser,
    getDoctorList,
    getChatRoomList
};