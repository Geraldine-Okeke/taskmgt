import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ authenticated, handleSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const foundUser = storedUserData.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      handleSignIn(); 
      navigate('/HOME/Home'); 
    } else {
      setErrorMessage('Incorrect username or password'); 
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {}
      </form>
    </div>
  );
}

export default SignIn;
