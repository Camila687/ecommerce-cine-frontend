import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StarFill, CalendarEventFill, Award } from 'react-bootstrap-icons';


const Home = () => {
  const [premieres, setPremieres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPremieres = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/premieres');

        // Campos extra
        const premieresConExtras = response.data.map(premiere => ({
          ...premiere,
          genero: 'Acción',      // Genero
          ratingImdb: 8.5,       // Rating IMDb
          anioEstreno: 2025      // Año de Estreno
        }));

        setPremieres(premieresConExtras);

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
    <div className="container mt-5">
      <h1 className="text-center mb-4">🎬 Estrenos de Cine</h1>

      <div className="row row-cols-1 row-cols-md-2">
        {premieres.map((premiere) => (
          <div key={premiere.id} className="col mb-4" style={{ cursor: 'pointer' }} onClick={handleImageClick}>
            <div className="card shadow-sm h-100">
              <div className="row g-0 align-items-center">
                <div className="col-md-4">
                  <img
                    src={premiere.imagenUrl}
                    alt={premiere.titulo}
                    className="img-fluid rounded-start card-img-top"
                    style={{ height: 'auto', objectFit: 'cover', width: '100%' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{premiere.titulo}</h5>
                    <p className="card-text small" style={{ textAlign: 'justify' }}>{premiere.descripcion}</p>

                    {/* Íconos */}
                    <div className="d-flex flex-wrap gap-3 align-items-center mt-3">
                      {premiere.genero && (
                        <div className="d-flex align-items-center gap-1">
                          <Award size={20} color="#6c757d" /> 
                          <small className="text-muted">{premiere.genero}</small>
                        </div>
                      )}
                      {premiere.ratingImdb && (
                        <div className="d-flex align-items-center gap-1">
                          <StarFill size={20} color="#ffc107" /> 
                          <small className="text-muted">IMDb: {premiere.ratingImdb}</small>
                        </div>
                      )}
                      {premiere.anioEstreno && (
                        <div className="d-flex align-items-center gap-1">
                          <CalendarEventFill size={20} color="#0dcaf0" /> 
                          <small className="text-muted">{premiere.anioEstreno}</small>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;