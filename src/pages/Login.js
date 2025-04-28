import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Google, PersonFill, Film } from 'react-bootstrap-icons';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    Swal.fire({
      icon: 'info',
      title: 'Acceso restringido',
      text: 'Actualmente solo puedes continuar como Invitado.',
      confirmButtonText: 'Aceptar'
    });
  };

  const handleGuestLogin = () => {
    navigate('/dulceria');
  };

  return (
    <div className="container-fluid py-5" style={{
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                 style={{ width: '100px', height: '100px' }}>
              <Film size={50} color="#764ba2" />
            </div>
            <h2 className="mt-4 mb-1 fw-bold">Bienvenido</h2>
            <p className="text-muted mb-4">Ingresa para disfrutar de la mejor experiencia</p>
          </div>
          
          <div className="d-flex flex-column align-items-center gap-3">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
              style={{ transition: 'all 0.3s ease' }}
            >
              <Google size={20} className="me-2" /> Continuar con Google
            </button>
            
            <div className="d-flex align-items-center w-100 my-3">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted">o</span>
              <hr className="flex-grow-1" />
            </div>
            
            <button
              onClick={handleGuestLogin}
              className="btn btn-danger btn-lg w-100 d-flex align-items-center justify-content-center"
              style={{ transition: 'all 0.3s ease' }}
            >
              <PersonFill size={20} className="me-2" /> Ingresar como Invitado
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-muted small">
              Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;