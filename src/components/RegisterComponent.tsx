import {useState, type ChangeEvent, useEffect } from "react"
import "../styles/RegisterComponent.css"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { IRegisterFormData } from "../types/auth.types";
import { clearError, registerUser } from "../store/slices/authSlice";




export function RegisterComponent() {

    const dispath = useDispatch()
    const navigate = useNavigate()

    const {loading, error, isAuthenticated} = useSelector((state) => state.auth);

    const [formData, setFormData] = useState<IRegisterFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    })

    const [localError, setLocalError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;


        setFormData((prev) => ({
            ...prev,
            [name] : value
        }));

        dispath(clearError());
        setLocalError("");


    }


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => 
        {
            e.preventDefault();

            if(formData.password !== formData.confirmPassword)  {
                setLocalError("Пароли не сопадают")
                return;
            }

            const result = await dispath(registerUser(formData));

            if(registerUser.fulfilled.match(result))
            /*    {
                    navigate("/");
                }*/

            console.log('Регистрация прошла успешно');


        }

    //redirect


    return (<div>
        {(localError || error) && (
                    <div className="error-message">
                        {localError || error}
                    </div>
                )}
        <div className="register-container">
        <div className="register-component">
            <h1>Register</h1>
          <input 
               name = "firstName"
               type = "text"
               placeholder='Please enter your first name'
               className="register-component-input"
               value={formData.firstName}
               onChange={handleChange}>
        </input>
        <input 
               name = "lastName"
               type = "text"
               placeholder='Please enter your last name'
               className="register-component-input"
               value={formData.lastName}
               onChange={handleChange}>
        </input>
         <input
               name="email" 
               type = "email"
               placeholder='Please enter your email'
               className="register-component-input"
               value={formData.email}
               onChange={handleChange}>
        </input>
        <input 
               name = "password"
               type = "password"
               placeholder='Please enter your password'
               className="register-component-input"
               value={formData.password}
               onChange={handleChange}>
        </input>
         <input
              name = "confirmPassword" 
               type = "password"
               placeholder='Please confirm your password'
               className="register-component-input"
               value={formData.confirmPassword}
               onChange={handleChange}>
        </input>
            <button type="submit" className="register-component-button" onClick={handleSubmit}>Register now</button>
            <p className="">
                Already have account? <a href = "/login">Login</a>
            </p>

            </div>
           </div>
           </div>
    )
}


