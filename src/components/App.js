import React from 'react';
import Home from "./HOME/Home"
import Projects from "./PROJECTS/Projects";
import AddProjectPage from "./PROJECTS/AddProjectsPage";
import { ProjectsProvider } from "./PROJECTS/ProjectsContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewProjects from './PROJECTS/ViewProjects';

export default function App() {
  return (
    <ProjectsProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/PROJECTS/Projects" element={<Projects/>}/>
          <Route path='PROJECTS/AddProjectsPage' element={<AddProjectPage/>}/>
          <Route path='PROJECTS/ViewProjects' element={<ViewProjects/>} />
        </Routes>
      </Router>
    </ProjectsProvider>
  );
}
