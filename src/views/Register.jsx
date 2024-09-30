import React, { useState, useContext } from 'react';
import { MyContext } from '../mycontext/MyContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setToken, setUser } = useContext(MyContext); 
    const navigate = useNavigate();

    const validarFormulario = async (e) => {
        e.preventDefault();

        if (email === "" || password === "" || confirmPassword === "") {
            alert('faltan campos');
            return false;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener mínimo 6 caracteres');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return false;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error('Error en el registro');
            }

            const data = await res.json();
            setToken(data.token); 
            setUser(data.email); 
            alert('Usuario creado con éxito');
            navigate('/'); 
        } catch (error) {
            alert('Error al registrar');
        }
    };

    return (
        <div>
            <form className="col-md-7 mx-auto my-5" onSubmit={validarFormulario}>
                <h1>Register</h1>
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
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirma tu contraseña"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
