import React from 'react';
import AddProjects from './AddProjects';
import { useProjects } from './ProjectsContext';

function AddProjectPage() {
  const { addProject } = useProjects();

  const handleAddProject = (name, description, startDate, dueDate, steps) => {
    // Pass the steps array to the addProject function
    addProject(name, description, startDate, dueDate, steps);
  };
  
  return (
    <div>
      <h2 className='font-bold text-3xl text-center p-4'>Add Project</h2>
      <AddProjects addProject={handleAddProject} /> 
    </div>
  );
}

export default AddProjectPage;
