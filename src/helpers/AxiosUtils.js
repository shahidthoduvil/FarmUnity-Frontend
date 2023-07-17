import axios from 'axios';
import { BASE_URL } from '../utils/config';


const createAxiosClient = (baseUrl) => {
    console.log('reached here also :', baseUrl);
    const client = axios.create({
        baseUrl,
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

const userAxiosInstance = createAxiosClient(BASE_URL)


userAxiosInstance.interceptors.request.use(async (req) => {

    const modifiedReq = attachToken(req, "authToken")
    console.log('Modified req is :', modifiedReq);
    return modifiedReq;
})

export { userAxiosInstance }