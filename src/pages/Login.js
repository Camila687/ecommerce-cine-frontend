import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate('/dulceria');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Iniciar Sesión</h2>
      <p>Puedes iniciar sesión como Invitado</p>
      <button onClick={handleGuestLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Ingresar como Invitado
      </button>
    </div>
  );
};

export default Login;