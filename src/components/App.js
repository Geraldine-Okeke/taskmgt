import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './HOME/Home';
import Projects from './PROJECTS/Projects';
import AddProjectPage from './PROJECTS/AddProjectsPage';
import ViewProjects from './PROJECTS/ViewProjects';
import SignIn from './AUTH/SignIn';
import SignUp from './AUTH/SignUp';
import { ProjectsProvider } from './PROJECTS/ProjectsContext';
import LandingPage from './HOME/LandingPage';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const username = localStorage.getItem('username'); 
  const profilePic = localStorage.getItem('profilePic'); 

  const handleSignIn = () => {
    setAuthenticated(true);
  };

  const handleSignOut = () => {
    setAuthenticated(false);
  };

  return (
    <ProjectsProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route
            path="/HOME/home"
            element={
              <Home
                authenticated={authenticated}
                handleSignOut={handleSignOut}
                profilePic={profilePic}
                username={username}
              />
            }
          />
          <Route
            path="/PROJECTS/Projects"
            element={
              <Projects
                authenticated={authenticated}
                handleSignOut={handleSignOut}
                profilePic={profilePic}
                username={username}
              />
            }
          />
          <Route
            path="/PROJECTS/AddProjectsPage"
            element={
              <AddProjectPage
                authenticated={authenticated}
                handleSignOut={handleSignOut}
                profilePic={profilePic}
                username={username}
              />
            }
          />
          <Route
            path="/PROJECTS/ViewProjects"
            element={
              <ViewProjects
                authenticated={authenticated}
                handleSignOut={handleSignOut}
                profilePic={profilePic}
                username={username}
              />
            }
          />
          <Route
            path="/AUTH/SignIn"
            element={
              <SignIn
                authenticated={authenticated}
                handleSignIn={handleSignIn}
                profilePic={profilePic}
                username={username}
              />
            }
          />
          <Route
            path="/AUTH/SignUp"
            element={
              <SignUp
                authenticated={authenticated}
                handleSignIn={handleSignIn}
                profilePic={profilePic}
                username={username}
              />
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </ProjectsProvider>
  );
}
