import { userAxiosInstance } from "../../helpers/AxiosUtils";

const GoogleAuthentication = (userProfile) => {
    const values ={
        email : userProfile.email,
        first_name : userProfile.given_name,
        last_name : userProfile.family_name,
        password : userProfile.id,
        is_google : true
    }
    console.log(userProfile,'is the values');
    return userAxiosInstance.post("/api/google_authentication/", values,{
        withCredentials:true
    })
}       




export {
    GoogleAuthentication
}