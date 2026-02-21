import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import {useState, type ChangeEvent, useEffect} from "react"
import type { ILoginFormData } from "../types/auth.types";
import { loginUser } from '../store/slices/authSlice';
import "../styles/LoginComponent.css"



const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
      );
      resolve();
    }, 300);
  });
  return promise;
};

export  function LoginComponent (){

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {loading, error, isAuthenticated} = useSelector((state) => state.auth)

  const [formData, setFormData] = useState<ILoginFormData>({
        email: "",
        password: ""
    });

     useEffect(() => {
        if (isAuthenticated) {
          navigate("/");
        }
      }, [isAuthenticated, navigate]);

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
    const userData: ILoginFormData = {
      email : formData.get('email')?.toString() || "",
      password : formData.get('password')?.toString() || ""
    }

    const result = await dispatch(loginUser(userData));
    if(loginUser.fulfilled.match(result)){
      console.log('Аутентификация прошла успешно!')
    //  navigate("/");
    }

};

  const theme = useTheme();
  return (
    <div className="login-container">
    {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
    <p className="">
                Don't have account yet? <a href = "/register">Register</a>
            </p>
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
    
    </div>
    )
}