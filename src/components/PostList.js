import React, { useEffect, useState } from 'react';
import api from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/posts')
      .then((response) => setPosts(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleLike = (id) => {
    api.patch(`/posts/${id}/like`)
      .then((response) => {
        // Met à jour localement les likes de la publication
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id ? { ...post, likes: response.data.likes } : post
          )
        );
      })
      .catch((err) => {
        console.error("Erreur lors de l'incrémentation des likes :", err);
      });
  };

  return (
    <div>
      <h1>Publications</h1>
      {error && <p>Erreur : {error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <img src={post.image} alt={post.title} style={{ width: '150px', height: '150px' }} />
            <p>Likes : {post.likes}</p>
            <button onClick={() => handleLike(post.id)}>Like 👍</button>
          </div>
        ))
      ) : (
        <p>Aucune publication trouvée.</p>
      )}
    </div>
  );
};

export default PostList;
