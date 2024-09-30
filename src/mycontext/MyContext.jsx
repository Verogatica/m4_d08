import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const total = cart.reduce(
        (acc, pizza) => acc + (pizza.price || 0) * pizza.cantidad,
        0
    );

    const logout = () => {
        setToken(null);
        setUser(null);
    };
    

    const getUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.email); 
            } else {
                throw new Error;
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/pizzas');
                if (!res.ok) {
                }
                const data = await res.json();
                setPizzas(data);
            } catch (error) {
            }
        };
        getData();
    }, []);

    useEffect(() => {
        if (pizzas.length) {
            setCart(pizzas.map(pizza => ({ ...pizza, cantidad: 0 })));
        }
    }, [pizzas]);

    const sumaPizza = (id) => {
        setCart(prevCart =>
            prevCart.map((pizza) =>
                pizza.id === id ? { ...pizza, cantidad: pizza.cantidad + 1 } : pizza
            )
        );
    };

    const restaPizza = (id) => {
        setCart(prevCart =>
            prevCart.map((pizza) =>
                pizza.id === id
                    ? { ...pizza, cantidad: Math.max(pizza.cantidad - 1, 0) }
                    : pizza
            )
        );
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setToken(data.token); 
                setUser({ email: data.email }); 
            } else {
                const errorData = await response.json();
            } 
        } catch (error) {
        }
    };
    
    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer token_jwt`,
                },
                body: JSON.stringify({ email, password }),
            });
            

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUser(data.email);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    const checkout = async () => {
        try {
            await fetch("http://localhost:5000/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cart,
                }),
            });
        } catch (error) {
        }
    };

    const handleCheckout = async () => {
        const itemsInCart = cart.some(pizza => pizza.cantidad > 0);
        if (itemsInCart && token && user) {
            try {
                await checkout(); 
                alert("Compra realizada con éxito!");
                setCart([]); 
            } catch (error) {
            }
        } else {
            alert("No hay productos en tu carrito.");
        }
    };

    return (
        <MyContext.Provider value={{ 
            cart, 
            setCart, 
            total, 
            sumaPizza, 
            restaPizza, 
            pizzas, 
            token, 
            user, 
            setToken, 
            setUser, 
            logout, 
            login, 
            register, 
            checkout, 
            getUserProfile, 
            handleCheckout 
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyContextProvider;
