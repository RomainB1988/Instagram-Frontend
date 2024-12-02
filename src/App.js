import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import PostList from './components/PostList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    if (token) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      <h1>Instagram Clone</h1>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <PostList />
      )}
    </div>
  );
}

export default App;
