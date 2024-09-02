import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserService from '../services/userServices';
import { toast } from 'react-toastify';

interface UserState {
  userInfo: any[]; // Adjust this type according to your user data structure
  token: string;
}

interface AuthPayload {
  token: string;
  // Add other user properties if needed
}

// Async login function
export const userLogin = async (payload: any, dispatch: any) => {
  try {
    const res: any = await UserService.signInUSer(payload);
    console.log('redux res loign here', res);
    
    dispatch(authUser(res?.data?.data || {}));
    if (res?.data?.token) {
      await localStorage.setItem('token', res?.data?.data?.token);
      return res?.data;
    } else {
      console.log('User not able to login');
    }
  } catch (err) {
    console.log('Error on login slice', err);
    throw err;
  }
};
export const userLogout = async (dispatch: any) => {
  try {
    const res: any = await UserService.logoutUser();
    console.log('redux res logout', res);
   return res?.data
  } catch (err) {
    console.log('Error on login slice', err);
    throw err;
  }
};

export const getForgotPassword = async ( payload: any ,dispatch: any) => {
    
    try {
        const res = await UserService.forgotPassword(payload);
        dispatch(authUser(res?.data || {}));
        return res?.data
    } catch (err) {
        console.log('Error on login slice', err);
        throw err
    }
}

<<<<<<< HEAD
export const resetPassword = async (payload: any, dispatch: any) => {
  try {
    const res = await UserService.resetPassword(payload);
    dispatch(authUser({
      token: '',
      userInfo: res?.data ? [res?.data] : []
    }));
    return res?.data;
  } catch (err) {
    console.log('Error on login slice', err);
    throw err;
  }
};

export const LogoutFunction = async (dispatch: any) => {
  try {
    const res = await UserService.logoutUser();
    dispatch(authUser({
      token: '',
      userInfo: []
    }));
    return res?.data;
  } catch (err) {
    console.log('Error on login slice', err);
    throw err;
  }
};
=======
>>>>>>> be79a9ffd1186b334765e630085192ce33851ecf

export const LogoutFunction = async ( dispatch: any) => {
    
    try {
        const res = await UserService.logoutUser();
        dispatch(authUser(res?.data || {}));
        return res?.data
    } catch (err) {
        console.log('Error on login slice', err);
        throw err
    }
}

export const signupFunction = async (payload: any, dispatch: any) => {
    try {
        const res = await UserService.signUpUser(payload);
        await localStorage.setItem("token", res?.data?.data?.token);
        dispatch(authUser(res?.data.data || {}));
        return res?.data || []
    } catch (err) {
        console.log('Error on login slice', err);
        throw err
    }
}


const initialState: UserState = {
  userInfo: [],
  token: ''
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<AuthPayload>) => {
      console.log('instaialstate', state);
      
      state.userInfo = [action.payload];
      state.token =  '';
    },
    signoutUser: (state) => {
      state.userInfo = [];
      state.token = '';
    }
  }
});

export const { authUser, signoutUser } = loginSlice.actions;
export default loginSlice.reducer;
