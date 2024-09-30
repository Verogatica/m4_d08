import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../mycontext/MyContext';

const PizzaDetails = () => {
  const { id } = useParams();
  const { pizzas } = useContext(MyContext);
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    if (pizzas.length) {
      const foundPizza = pizzas.find((p) => p.id === id);
      setPizza(foundPizza || null);
    }
  }, [id, pizzas]);

  if (!pizza) {
    return <div>Loading...</div>;
  }
  console.log(pizza);
  const ingredientesList = Array.isArray(pizza.ingredients) 
    ? pizza.ingredients 
    : pizza.ingredients ? pizza.ingredients.split(', ') : [];

  return (
    <article className="col-12 col-md-6 col-lg-4 my-4 p-3">
      <div className="card">
        <img
          src={pizza.img}
          className="card-img-top w-100 object-fit-cover imgpizza"
          alt="Pizza"
        />
        <div className="card-body">
          <h4 className="card-title fw-light mb-3 fw-bold">
            Pizza {pizza.name}
          </h4>
          <hr className="p-0" />
          <p className="card-text h6 fw-light text-start">Ingredientes:</p>
          <ul className="fw-light text-center object-fit-cover">
            {ingredientesList.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item fw-light gris py-0 text-start fw-bold fs-5">
              Precio: ${pizza.price}
            </li>
          </ul>
          <div className="container d-flex justify-content-around pt-3">
            <button type="button" className="btn btn-dark">Añadir 🛒</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PizzaDetails;
