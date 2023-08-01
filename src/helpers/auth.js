
import { toast } from "react-hot-toast"
import { BASE_URL } from "../utils/config";




export default async function login(e) {

  try {
    const response = await fetch(`${BASE_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': e.target.email.value,
        'password': e.target.password.value
      })
    });
    console.log(response)

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('authToken', JSON.stringify(data));
      toast.success('Login success',{ duration: 5000 });
      return data;
    } else {
      toast.error('Invalid user credentials');
    }
  } catch (error) {
    toast.error('Login failed',{ duration: 5000 });
    console.error('Login failed:', error);
  }
}


 

export function getLocal() {
  const response = localStorage.getItem('authToken');
  return response;
}



        
