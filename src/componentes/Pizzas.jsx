import React, { useContext } from 'react';
import { MyContext } from '../mycontext/MyContext';
import { Link } from 'react-router-dom';

const Pizzas = ({ datos }) => {
    const { cart, sumaPizza } = useContext(MyContext);
    const pizzaInCart = cart.find(pizza => pizza.id === datos.id);
    const cantidad = pizzaInCart ? pizzaInCart.cantidad : 0;

  return (
    <>
    <article className="col-12 col-md-6 col-lg-4 my-4 p-3">
        <div className="card ">
          <img
            src={datos.img}
            className="card-img-top w-100 object-fit-cover imgpizza"
            alt="Pizza"
          />
          <div className="card-body">
            <h4 className="card-title fw-light mb-3 fw-bold">
              Pizza {datos.name} {cantidad > 0 && `(${cantidad})`}
            </h4>
            <hr className="p-0"/>
            <p className="card-text h6 fw-light text-start">Ingredientes:</p>
            <ul className="fw-light text-right">
            {datos.ingredients.map((ingrediente, index) => (
            <li key={index}>{ingrediente}</li>
             ))}
            </ul>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item fw-light gris py-0 text-start fw-bold fs-5">
                Precio: ${datos.price}
              </li>
            </ul>
            <div className="container d-flex justify-content-around pt-3">
            <div className="container d-flex justify-content-around pt-3">
            <Link to={`/pizza/${datos.id}`} className="btn btn-outline-dark">Ver más 👀</Link>
            <button
              onClick={() => {
                console.log(`Adding pizza with id: ${datos.id}`);
                sumaPizza(datos.id); 
              }}
              type="button"
              className="btn btn-dark"
            >
              Añadir 🛒
            </button>
          </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Pizzas;
