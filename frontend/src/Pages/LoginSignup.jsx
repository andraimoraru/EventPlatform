import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext'; 
import './CSS/LoginSignup.css';
import { loginUser, addUser } from '../API/api'; 

export const LoginSignup = () => {
    const { saveUser } = useContext(UserContext);
    const [state, setState] = useState("Log In");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        const response = await loginUser(formData);
        if (response.success) {
            saveUser({ 
                ...response.user, 
                token: response.token 
            });
            response.user.isStaff === true ? navigate("/admin/*")  : navigate("/account"); 
            
        } else {
            alert("Login failed: " + response.message);
        }
    };

    const handleSignup = async () => {
        const response = await addUser(formData);
        if (response.success) {
            saveUser({
                ...response.user,
                token: response.token
            });
            navigate("/events");
        } else {
            alert("Signup failed: " + response.message);
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your username'/>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password'/>
                </div>
                <button onClick={state === "Log In" ? handleLogin : handleSignup}>Continue</button>
                {state === "Sign Up" ? 
                    <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Log In")}>Log in here</span></p>
                    : 
                    <p className="loginsignup-login">Don't have an account? <span onClick={() => setState("Sign Up")}>Sign up</span></p>
                }
            </div>
        </div>
    );
};

export default LoginSignup;