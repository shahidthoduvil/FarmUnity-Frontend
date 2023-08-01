import axios from 'axios';
import { BASE_URL,base_url } from '../utils/config';


const createAxiosClient = (base_url) => {
    console.log('reached here also :', base_url);
    const client = axios.create({
        base_url,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    console.log('Axios client created :', client);
    return client;
}

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName.access)
    if (authToken) {
        console.log('Token taken :', JSON.stringify(authToken));
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}


const userAxiosInstance = createAxiosClient(base_url)
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "userJwt")
    console.log('Useraxios instance modified :', modifiedReq);
    return modifiedReq;
})


export { userAxiosInstance }