import axios from 'axios';
// const BACK_URL = "https://servidor-shoesshop-jjdevelop-404-juan-jose-marin-projects.vercel.app/";
const BACK_URL = "https://servidor-shoesshop.vercel.app/";


export const api = axios.create({
    baseURL: BACK_URL,
    withCredentials: true
})

export const errorReturn = (error) => {
    return {
        error: true,
        status: error.response?.status,
        message: JSON.stringify(error.response?.data)
    }
}