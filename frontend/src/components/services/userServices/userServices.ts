import { getRequest, postRequest,putRequest } from "../index";

class LoginService {
  signInUSer = async (payload:any) => {
    return postRequest(`/api/v1/login`,payload) 
  }
  signUpUser = async (payload:any) =>{
    return postRequest(`/api/v1/signIn`,payload)
  }
  logoutUser = async () => {
    return getRequest('/api/v1/users/logout')
  }
  forgotPassword = async (payload: any) => {
    return putRequest('/api/v1/forgotPassword', payload)
  } 
<<<<<<< HEAD
  resetPassword = async (payload: any) => {
    return postRequest('/api/v1/resetPassword', payload)
  } 
  updateUserProfile = async (payload: any) => {
    return postRequest('/api/v1/updateProfile', payload)
  } 
=======
>>>>>>> be79a9ffd1186b334765e630085192ce33851ecf

}

const instance = new LoginService;
export default instance
