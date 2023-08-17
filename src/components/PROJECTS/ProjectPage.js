import React from 'react';
import { Link } from 'react-router-dom';
function ProjectsPage() {

  return (
    <div>
      <h2>Projects</h2>
      <div className="mb-4">
        <Link to="/PROJECTS/AddProjectsPage" className="bg-blue-500 px-4 py-2 text-white rounded">
          Add Project
        </Link>
      </div>
      
      <div className="mt-4">
        <Link to="/PROJECTS/ViewProjects" className="bg-green-500 px-4 py-2 text-white rounded">
          View Current Projects
        </Link>
      </div>
    </div>
  );
}

export default ProjectsPage;
