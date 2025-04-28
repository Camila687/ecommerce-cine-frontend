import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { sendPayment } from '../api/payment';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { numeroTarjeta, fechaExpiracion, cvv, correo, nombre, tipoDocumento, numeroDocumento } = formData;
  
    if (
      !numeroTarjeta || numeroTarjeta.length !== 16 ||
      !fechaExpiracion || !cvv || cvv.length !== 3 ||
      !correo.includes('@') || !nombre ||
      !tipoDocumento || !numeroDocumento
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos correctamente.'
      });
      return;
    }
  
    try {
      const response = await sendPayment(formData);
      console.log('Respuesta backend:', response);
  
      if (response.codigoRespuesta === "0") {
        Swal.fire({
          title: '¡Compra realizada con éxito!',
          text: 'Gracias por tu compra.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          localStorage.removeItem('cart'); // Limpiar el carrito
          navigate('/'); // Redirigir al Home
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en la compra',
          text: 'Hubo un problema procesando tu compra.'
        });
      }
    } catch (error) {
      console.error('Error al enviar pago', error);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'No pudimos procesar tu compra. Intenta nuevamente.'
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">💳 Pago</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Número de Tarjeta</label>
                <input type="text" name="numeroTarjeta" className="form-control" maxLength="16" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Fecha de Expiración (MM/YY)</label>
                <input type="text" name="fechaExpiracion" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>CVV</label>
                <input type="text" name="cvv" className="form-control" maxLength="3" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Correo Electrónico</label>
                <input type="email" name="correo" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Nombre</label>
                <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Tipo de Documento</label>
                <input type="text" name="tipoDocumento" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label>Número de Documento</label>
                <input type="text" name="numeroDocumento" className="form-control" onChange={handleChange} required />
              </div>

              <div className="alert alert-info text-center">
                <strong>Total a pagar: S/ {total.toFixed(2)}</strong>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100">
                Pagar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;