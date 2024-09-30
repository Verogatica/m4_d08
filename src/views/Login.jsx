import React, { useState, useContext } from 'react';
import { MyContext } from '../mycontext/MyContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken, setUser } = useContext(MyContext);
    const navigate = useNavigate();

    const validarFormulario = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            alert('faltan campos');
            return false;
        }

        try {
            const res = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await res.json();
            setToken(data.token); 
            setUser({ email: data.email });
            alert('Inicio de sesión exitoso');
            navigate('/');
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div>
            <form className="col-md-7 mx-auto my-5">
                <h1>Login</h1>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu correo electrónico"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => validarFormulario(e)}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
