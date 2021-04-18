import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:3000/api'; //for Web page
//axios.defaults.baseURL = 'exp://172.20.10.3:3000/api'; //for mobile device & Web Page

axios.defaults.baseURL = 'http://10.0.0.121:3000/api'; //for mobile device & Web Page
//axios.defaults.baseURL = 'http://10.0.0.65:19000/api'; //for mobile device & Web Page

export const getPosts = async () => {
    const response = await axios.get('/posts');
    return response.data;
};

export const createPost = async (data: any) => {
    const response = await axios.post('/createPost', data);
    return response.data;
}

export const createUser = async (data: any) => {
    const response = await axios.post('/signup', data);
    return response.data;
}

export const userLogin = async (data: any) => {
    const response = await axios.post('/login', data);
    return response.data;
}

export const userLogout = async () => {
    const response = await axios.get('/logout');
    return response.data;
}

export const getAuthUser = async () => {
    const response = await axios.get('/user');
    return response.data;
}

export const getDoctorList = async()=>{
    const response = await axios.get('/allDoctors')
    return response.data;

}
export default {
    getPosts,
    createPost,
    createUser,
    userLogin,
    userLogout,
    getAuthUser,
    getDoctorList
};