import React, { createContext, useContext, useState } from 'react';

const ProjectsContext = createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const addProject = (name, description) => {
    const newProject = { name, description };
    setProjects([...projects, newProject]);
  };
  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}
