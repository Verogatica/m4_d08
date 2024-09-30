import React, { useContext } from 'react';
import { MyContext } from '../mycontext/MyContext';
import { useNavigate, useParams } from 'react-router-dom';

const CardPizza = () => {
  const { pizzas, cart, sumaPizza } = useContext(MyContext);
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const pizza = pizzas.find(pizza => pizza.id === paramId);
  
  const ingredientesList = Array.isArray(pizza?.ingredients)
    ? pizza.ingredients
    : typeof pizza?.ingredients === 'string'
    ? pizza.ingredients.split(', ')
    : [];

  return (
    <div>
      {pizza ? (
        <article className="col-12 my-4 p-3">
          <div className="card">
            <img src={pizza.img} className="card-img-top w-100 object-fit-cover imgpizza" alt="Pizza" />
            <div className="card-body">
              <h4 className="card-title fw-light mb-3 fw-bold">Pizza {pizza.name}</h4>
              <p className="card-text">{pizza.desc || 'Descripción no disponible.'}</p>
              <hr className="p-0" />
              <p className="card-text h6 fw-light text-start">Ingredientes:</p>
              {ingredientesList.length > 0 ? (
                <ul className="fw-light object-fit-cover">
                  {ingredientesList.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay ingredientes disponibles.</p>
              )}
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item fw-light gris py-0 text-start fw-bold fs-5">
                  Precio: ${pizza.price}
                </li>
                {/* Uncomment the lines below if you need stock and availability */}
                {/* <li className="list-group-item fw-light gris py-0 text-start">
                  Stock: {pizza.stock}
                </li>
                <li className="list-group-item fw-light gris py-0 text-center">
                  Disponibilidad: {pizza.disponibilidad}
                </li> */}
              </ul>
              <div className="container d-flex justify-content-around pt-3">
              <button className="btn btn-outline-dark" onClick={() => navigate('/')}>Volver</button>
                <button
                  onClick={() => {
                    console.log(`Adding pizza with id: ${pizza.id}`); 
                    sumaPizza(pizza.id); 
                  }}
                  type="button"
                  className="btn btn-dark"
                >
                  Añadir 🛒
                </button>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CardPizza;
