import React, { useContext } from "react";
import { MyContext } from "../mycontext/MyContext";

const Cart = () => {
  const { cart, total, sumaPizza, restaPizza, token, user, handleCheckout } = useContext(MyContext);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-8">
          <h2>Carrito de Compras</h2>
          {cart
            .filter(pizza => pizza.cantidad > 0) 
            .map((pizza) => {
              const ingredientesArray = pizza.ingredients || [];

              return (
                <div key={pizza.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4 imgpizza">
                      <img
                        src={pizza.img}
                        className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                        alt={pizza.nombre}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Pizza {pizza.name}</h5>
                        <p className="card-text mb-0">Precio: ${pizza.price ? pizza.price.toLocaleString("es-CL") : 'N/A'}</p>
                        <ul className="fw-light list-unstyled d-flex">
                          {ingredientesArray.map((ingrediente, index) => (
                            <li key={index}>
                              {ingrediente.trim()}
                              {index < ingredientesArray.length - 1 ? ", " : index === ingredientesArray.length - 1 ? "." : ""}
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex flex-column align-items-end">
                          <div className="me-3">
                            <button
                              onClick={() => sumaPizza(pizza.id)}
                              className="btn btn-outline-success me-1"
                            >
                              +
                            </button>
                            <button
                              onClick={() => restaPizza(pizza.id)}
                              className="btn btn-outline-danger"
                            >
                              -
                            </button>
                          </div>
                          <p className="card-text mb-0">Unidades: {pizza.cantidad}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-4 ">
          <div className="mb-3 ">
            <h3>Resumen de compra</h3>
            <hr />
            <h4>Total a pagar: ${total.toLocaleString("es-CL")}</h4>
            <button
              className={`btn btn-primary col-12 rounded-pill mt-4 ${!(token && user) ? 'disabled' : ''}`}
              disabled={!(token && user)}
              onClick={handleCheckout} 
            >
              Continuar con el pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
