import axios from "axios";

axios.defaults.baseURL = 'http://192.168.0.19:3000/api'; //Only works in one of our local networks
//axios.defaults.baseURL = 'http://yourLocalNetwork:3000/api';
//Uncomment the line above with your local network and comment the first axios default

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