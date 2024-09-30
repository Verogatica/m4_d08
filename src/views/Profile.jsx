import React, { useContext } from 'react';
import { MyContext } from '../mycontext/MyContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {
    const { logout, user } = useContext(MyContext); 
    const handleLogout = () => {
        logout(); 
    };

    return (
        <div className="text-center m-5">
            <h2 className="mb-2">Profile</h2>
            <i className="bi bi-person icon-circle mb-4"></i>
            <h4 className="mb-4">{user ? user.email : "No user found"}</h4>
            <button 
                type="button" 
                className="btn btn-outline-dark mb-4"
                onClick={handleLogout} 
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Profile;
