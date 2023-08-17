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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
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
        />
        {profilePic ? (
          <img src={profilePic} alt="Profile" />
        ) : (
          <img src={getDefaultProfilePic()} alt="Default Profile" />
        )}

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
