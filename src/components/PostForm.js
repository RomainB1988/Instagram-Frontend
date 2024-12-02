import React, { useState } from 'react';
import api from '../services/api';

const PostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Préparation des données pour l'API
    const postData = {
      title,
      description,
      image,
      likes: 0, // Initialise les likes à 0
      user_id: 1, // ID de l'utilisateur par défaut (à ajuster selon ta base de données)
    };

    // Envoi des données au backend
    api.post('/posts', postData)
      .then((response) => {
        console.log('Post créé avec succès :', response.data);
        onPostCreated(response.data); // Met à jour la liste des posts dans le parent
        setTitle('');
        setDescription('');
        setImage('');
        setError(null);
      })
      .catch((err) => {
        console.error('Erreur lors de la création du post :', err);
        setError('Impossible de créer la publication. Vérifiez les champs.');
      });
  };

  return (
    <div>
      <h1>Créer une nouvelle publication</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">URL de l'image :</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
};

export default PostForm;
