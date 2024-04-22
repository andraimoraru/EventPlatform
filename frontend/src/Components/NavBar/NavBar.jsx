import React, { useContext } from 'react';
import "./NavBar.css";
import logo from "../Assets/logo.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="nav-login">
            <Link to="/"><button>Home</button></Link>
            {user && user.username ? (
                <>
                    {user.isStaff ? (
                        <>
                            <Link to="/admin"><button>Admin Dashboard</button></Link>
                        </>
                    ) : (
                        <Link to="/account"><button>Account</button></Link>
                    )}
                    <button onClick={() =>{ logout();
                                            navigate("/")
                                            }}>Logout</button>
                </>
            ) : (
                <Link to="/login"><button>Log In</button></Link>
            )}
        </div>
    </div>
  );
};

