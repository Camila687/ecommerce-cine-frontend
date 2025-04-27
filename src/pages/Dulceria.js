import React, { useState, useEffect } from 'react';
import { getCandystore } from '../api/candystore';
import { useNavigate } from 'react-router-dom';

const Dulceria = () => {
  const [candys, setCandys] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandystore = async () => {
      try {
        const data = await getCandystore();
        setCandys(data);
      } catch (error) {
        console.error('Error al traer candystore', error);
      }
    };

    fetchCandystore();
  }, []);

  const handleAddToCart = (candy) => {
    setCart([...cart, candy]);
  };

  const handleContinue = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/pago');
  };

  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dulcería</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {candys.map((candy) => (
          <div key={candy.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{candy.nombre}</h3>
            <p>{candy.descripcion}</p>
            <p>Precio: S/ {candy.precio.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(candy)}>Agregar</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Total: S/ {total.toFixed(2)}</h3>
        <button onClick={handleContinue} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Continuar a Pago
        </button>
      </div>
    </div>
  );
};

export default Dulceria;