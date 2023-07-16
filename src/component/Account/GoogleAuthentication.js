import { userAxiosInstance } from "../../helpers/AxiosUtils";

const GoogleAuthentication = (value) => {
    const values ={
        email : value.email,
        first_name : value.given_name,
        last_name : value.family_name,
        password : value.id,
        is_google : true
    }
    return userAxiosInstance.post("/api/google_authentication/", values,{
        withCredentials:true
    })
}




export {
    GoogleAuthentication
}