import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LLMComponent from './LLMComponent';

const App: React.FC = () => {
  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   // Fetch user data on load
  //   axios.get('/profile')
  //     .then(response => {
  //       setUser(response.data);
  //     })
  //     .catch(() => {
  //       setUser(null);
  //     });
  // }, []);

  // const handleLogin = () => {
  //   window.location.href = 'http://localhost:5000/login';
  // };

  return (
    <div>
      <LLMComponent />
    </div>
  );
}

export default App;
