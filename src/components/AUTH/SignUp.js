import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import femaleIcon from '../images/femaleIcon.png';
import maleIcon from '../images/maleIcon.png';

const SignUp = ({ handleSignIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (username && email && password && gender) {
      const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
      const existingUser = storedUserData.find((user) => user.email === email);
      if (existingUser) {
        setErrorMessage('Email has already been used');
        return;
      }
      setErrorMessage('');
      const user = { username, email, password, gender, profilePic };
      storedUserData.push(user);
      localStorage.setItem('userData', JSON.stringify(storedUserData));

      const defaultProfilePic = getDefaultProfilePic(gender);
      localStorage.setItem('profilePic', profilePic || defaultProfilePic);
      localStorage.setItem('username', username);

      const userProjects = JSON.parse(localStorage.getItem('userProjects')) || {};
      userProjects[username] = [];
      localStorage.setItem('userProjects', JSON.stringify(userProjects));

      handleSignIn();
      navigate('/HOME/home');
    } else {
      setErrorMessage('Please fill out all fields');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const getDefaultProfilePic = () => {
    if (gender === 'male') {
      return maleIcon;
    } else if (gender === 'female') {
      return femaleIcon;
    } else {
      return 'defaultIcon.png';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Sign Up</h2>
      <form onSubmit={handleSignUp} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <label className="block">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="max-w-full h-auto mt-2" />
        ) : (
          <img src={getDefaultProfilePic()} alt="Default Profile" className="max-w-full h-auto mt-2" />
        )}

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded block w-full focus:outline-none hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
