import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [premieres, setPremieres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPremieres = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/premieres');
        setPremieres(response.data);
      } catch (error) {
        console.error('Error al traer premieres', error);
      }
    };

    fetchPremieres();
  }, []);

  const handleImageClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Películas en Estreno</h1>
      {premieres.length > 0 ? (
        premieres.map((premiere) => (
          <div key={premiere.id} style={{ 
            display: 'flex', 
            marginBottom: '30px',
            alignItems: 'flex-start'
          }}>
            {/* Imagen a la izquierda */}
            <div style={{ marginRight: '30px' }}>
              <img 
                src={premiere.imagenUrl} 
                alt={premiere.titulo} 
                style={{ 
                  width: '200px', 
                  height: '300px', 
                  objectFit: 'cover',
                  cursor: 'pointer' 
                }}
                onClick={handleImageClick}
              />
            </div>
            
            {/* Texto a la derecha */}
            <div>
              <h2 style={{ marginTop: '0' }}>{premiere.titulo}</h2>
              <p>{premiere.descripcion}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Cargando estrenos...</p>
      )}
    </div>
  );
};

export default Home;