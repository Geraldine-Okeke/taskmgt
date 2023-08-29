import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './HOME/Home';
import Projects from './PROJECTS/Projects';
import AddProjectPage from './PROJECTS/AddProjectsPage';
import ViewProjects from './PROJECTS/ViewProjects';
import DarkModeToggle from './DarkModeToggle';
import { ProjectsProvider } from './PROJECTS/ProjectsContext';
import '../App.css'
export default function App() {
  

  
  return (
    
    <ProjectsProvider>
      <Router>
      <DarkModeToggle />
        <Routes>
          
          <Route
            path="/"
            element={
              <Home
                
              />
            }
          />
          <Route
            path="/PROJECTS/Projects"
            element={
              <Projects
                
              />
            }
          />
          <Route
            path="/PROJECTS/AddProjectsPage"
            element={
              <AddProjectPage
                
              />
            }
          />
          <Route
            path="/PROJECTS/ViewProjects"
            element={
              <ViewProjects
                
              />
            }
          />
          
          
        </Routes>
      </Router>
      <ToastContainer />
    </ProjectsProvider>
  );
}
