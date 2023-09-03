import React, { createContext, useContext, useState, useEffect } from 'react';
const ProjectsContext = createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    return savedProjects;
  });

  useEffect(() => {
    localStorage.setItem('savedProjects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectId, name, description, startDate, dueDate, steps) => {
    const newProject = {
      id: projectId, 
      name,
      description,
      startDate,
      dueDate,
      steps,
    };


    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const deleteProject = (index) => {
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
