import './App.css';
import Navbar from './componentes/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './views/Home';
import Footer from './componentes/Footer';
import Register from './views/Register';
import Cart from './views/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardPizza from './views/CardPizza';
import NotFound from './views/NotFound';
import Login from './views/Login';
import Profile from './views/Profile';
import MyContextProvider, { MyContext } from './mycontext/MyContext';
import { useContext } from 'react';


function App() {
  const { user } = useContext(MyContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<CardPizza />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login/>} />
        <Route path="*" element={<NotFound />} /> {/* Manejo de rutas no encontradas */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
