import React, { useState } from 'react';
import api from '../services/api';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Requête à l'API pour se connecter
    api.post('/users/sign_in', { user: { email, password } })
      .then((response) => {
        const token = response.headers['authorization']; // Récupère le token
        localStorage.setItem('authToken', token); // Stocke le token dans localStorage
        setError(null);
        onLogin(token); // Notifie le parent que l'utilisateur est connecté
      })
      .catch(() => {
        setError('Email ou mot de passe incorrect');
      });
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
