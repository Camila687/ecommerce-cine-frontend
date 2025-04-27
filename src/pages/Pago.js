import React, { useState } from 'react';

import { sendPayment } from '../api/payment';

const Pago = () => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
    correo: '',
    nombre: '',
    tipoDocumento: '',
    numeroDocumento: ''
  });

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPayment(formData);
      console.log('Respuesta backend:', response);
  
      if (response.codigoRespuesta === "0") {
        alert('¡Compra realizada con éxito!');
        localStorage.removeItem('cart');
      } else {
        alert('Ocurrió un error en la compra.');
      }
    } catch (error) {
      console.error('Error al enviar pago', error);
      alert('Error al procesar el pago.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pago</h2>
      <p>Total a pagar: S/ {total.toFixed(2)}</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginTop: '20px' }}>
        <input type="text" name="numeroTarjeta" placeholder="Número de Tarjeta" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="text" name="fechaExpiracion" placeholder="Fecha Expiración (MM/YY)" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="email" name="correo" placeholder="Correo Electrónico" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="text" name="tipoDocumento" placeholder="Tipo Documento" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="text" name="numeroDocumento" placeholder="Número Documento" onChange={handleChange} required style={{ width: '100%', marginBottom: '10px' }} />
        
        <button type="submit" style={{ padding: '10px 20px' }}>Pagar</button>
      </form>
    </div>
  );
};

export default Pago;