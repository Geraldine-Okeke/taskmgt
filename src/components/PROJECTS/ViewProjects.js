import React from 'react';
import { useProjects } from './ProjectsContext';

function ViewProjects() {
  const { projects, deleteProject } = useProjects(); // Access projects from the context
  console.log(projects);
  return (
    <>
      <div>
      <h2>View Current Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project.name}
          <button onClick={() => deleteProject(index)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
    </>
    
  );
}

export default ViewProjects;
