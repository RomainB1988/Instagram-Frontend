import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TestAPI = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Effectuer une requête GET à l'API
    api.get('/ping')
      .then((res) => {
        setResponse(res.data.message); // Stocker la réponse
      })
      .catch((err) => {
        setError(err.message); // Stocker l'erreur en cas de problème
      });
  }, []); // Exécute une seule fois lors du montage du composant

  return (
    <div>
      <h1>Test API</h1>
      {response && <p>Réponse du serveur : {response}</p>}
      {error && <p>Erreur : {error}</p>}
    </div>
  );
};

export default TestAPI;
