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
    <div className="p-4">
      <h2 className="text-xl font-semibold">Sign In</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-2">
          <label className="block">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded block w-full focus:outline-none hover:bg-blue-600"
        >
          Sign In
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SignIn;
