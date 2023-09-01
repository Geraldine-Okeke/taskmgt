import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  // Initialize the projects state with the data from Local Storage or an empty array
  const [projects, setProjects] = useState(() => {
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    return savedProjects;
  });

  useEffect(() => {
    // No need to conditionally set the projects state here
    // The initial state is already set using functional state update
    localStorage.setItem('savedProjects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (name, description, startDate, dueDate, steps) => {
    const newProject = {
      name,
      description,
      startDate,
      dueDate,
      steps,
    };

    // Use functional state update to avoid the re-render loop
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const deleteProject = (index) => {
    // Use functional state update to avoid the re-render loop
    setProjects((prevProjects) => prevProjects.filter((_, projectIndex) => projectIndex !== index));
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, deleteProject, setProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
