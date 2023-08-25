import React from 'react';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Projects</h2>
      <div className="my-4">
        <Link
          to="/PROJECTS/AddProjectsPage"
          className="bg-blue-500 px-4 py-2 text-white rounded block w-full md:w-auto text-center md:inline-block"
        >
          Add Project
        </Link>
      </div>

      <div className="my-4">
        <Link
          to="/PROJECTS/ViewProjects"
          className="bg-green-500 px-4 py-2 text-white rounded block w-full md:w-auto text-center md:inline-block"
        >
          View Current Projects
        </Link>
      </div>
    </div>
  );
}

export default ProjectsPage;
