import React from 'react';
import AddProjects from './AddProjects';
import { useProjects } from './ProjectsContext';

function AddProjectPage() {
  const { addProject } = useProjects();

  // Logic to add project
  const handleAddProject = (name, description) => {
    // Call the addProject function from the context to add a new project
    addProject(name, description);
  };

  return (
    <div>
      <h2>Add Project</h2>
      <AddProjects addProject={handleAddProject} /> {/* Pass the handleAddProject function */}
    </div>
  );
}

export default AddProjectPage;
