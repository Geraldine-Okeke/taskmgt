// ProjectsContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectsContext = createContext();

export function useProjects() {
  return useContext(ProjectsContext);
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    const storedUsername = localStorage.getItem('username');
    setProfilePic(storedProfilePic);
    setUsername(storedUsername);
  }, []);

  const addProject = (name, description, startDate, dueDate, steps) => {
    const userKey = username || 'guest';
    const newProject = {
      name,
      description,
      startDate,
      dueDate,
      addedBy: username,
      steps, // Include steps property          
    };

    const existingUserProjects = JSON.parse(localStorage.getItem(userKey)) || [];

    const updatedUserProjects = [...existingUserProjects, newProject];

    localStorage.setItem(userKey, JSON.stringify(updatedUserProjects));

    setProjects(updatedUserProjects);
  };

  const deleteProject = (index) => {
    const userKey = username || 'guest';
    const existingUserProjects = JSON.parse(localStorage.getItem(userKey)) || [];
    const updatedUserProjects = existingUserProjects.filter((_, i) => i !== index);
    localStorage.setItem(userKey, JSON.stringify(updatedUserProjects));
    setProjects(updatedUserProjects);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, deleteProject, profilePic, username,setProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
