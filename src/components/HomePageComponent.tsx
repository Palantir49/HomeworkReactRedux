import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice";
import "../styles/HomeComponent.css"

export function HomePageComponent(){



const dispatch = useDispatch();
const navigate = useNavigate();

const {user, isAuthenticated} = useSelector((state) => state.auth);

useEffect(() => {
    if(!isAuthenticated) {
        navigate('/login');
    }
}, [isAuthenticated, navigate])

const handleLogout = () => {

    dispatch(logoutUser());
    navigate("/login");
}


    if (!isAuthenticated || !user) {
        return null;
    }
return (
    <div className="home-container">
    <div className="home-component">
        <h1>Welcome {user.name}!</h1>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout} className="home-component-button">
                    Logout
                </button>
    </div>
    </div>
)
}