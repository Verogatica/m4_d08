import React, { useEffect, useState, useContext } from 'react';
import Pizzas from '../componentes/Pizzas';
import { MyContext } from '../mycontext/MyContext';
//import { productos } from '../assets/data/pizzas.js';

const Home = () => {
  const { pizzas } = useContext(MyContext);

  return (
    <>
      <div className='Banner'>
        <h2>¡Pizzería Mamma Mia!</h2>
        <h6>Tenemos las mejores pizzas que podrás encontrar</h6>
      </div>
      <div className="container">
        <div className="row">
          {pizzas.map((pizza) => (
            <Pizzas 
            key={pizza.id}
            datos={pizza}></Pizzas>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

