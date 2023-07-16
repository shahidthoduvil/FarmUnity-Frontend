import axios from 'axios';
import { BASE_URL } from '../utils/config';


const createAxiosClient = (BASE_URL ) => {
    console.log('reached here also :', BASE_URL );
    const client = axios.create({
        BASE_URL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client;
}

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName)
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}

const userAxiosInstance = createAxiosClient(BASE_URL )
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "authToken")
    console.log('Ennem vilichu :' ,modifiedReq);
    return modifiedReq;
})

export {userAxiosInstance}