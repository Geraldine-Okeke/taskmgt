import React from 'react';
import AddProjects from './AddProjects';
import { useProjects } from './ProjectsContext';

function AddProjectPage() {
  const { addProject } = useProjects();

  
  const handleAddProject = (name, description, startDate, dueDate) => {
    
    addProject(name, description, startDate, dueDate);
  };
  
  return (
    <div>
      <h2>Add Project</h2>
      <AddProjects addProject={handleAddProject} /> 
    </div>
  );
}



export default AddProjectPage;
