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
    <div className="container mt-5">
      <h1 className="text-center mb-4">🍭 Dulcería</h1>

      <div className="row">
        {candys.map((candy) => (
          <div key={candy.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{candy.nombre}</h5>
                <p className="card-text">{candy.descripcion}</p>
                <p className="card-text"><strong>S/ {candy.precio.toFixed(2)}</strong></p>
                <button className="btn btn-success" onClick={() => handleAddToCart(candy)}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total y continuar */}
      <div className="text-center mt-4">
        <div className="alert alert-info" role="alert">
          <h4>Total a pagar: S/ {total.toFixed(2)}</h4>
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleContinue} disabled={cart.length === 0}>
          Continuar a Pago
        </button>
      </div>
    </div>
  );
};

export default Dulceria;