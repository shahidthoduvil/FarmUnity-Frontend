// import { userAxiosInstance } from "../../helpers/AxiosUtils";

// const GoogleAuthentication = (userProfile) => {
//     const values ={
//         email : userProfile.email,
//         first_name : userProfile.given_name,
//         last_name : userProfile.family_name,
//         password : userProfile.id,
//         is_google : true
//     }
    
//     return userAxiosInstance.post("google_authentication/", values, {
//         withCredentials: true,
//       })
//         .then((res) => {
       
//           console.log('success');
        
//         })
//         .catch((error) => {
//           console.error("Axios request error:", error);
         
          
//         });
// }       




// export {
//     GoogleAuthentication
// }