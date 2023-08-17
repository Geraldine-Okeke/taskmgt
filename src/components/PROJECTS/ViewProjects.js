import React, { useEffect, useRef } from 'react';
import { useProjects } from './ProjectsContext';
import { toast } from 'react-toastify';

function ViewProjects({ authenticated }) {
  const { projects, deleteProject, username } = useProjects();
  const notifiedProjectsRef = useRef([]);
  const toastRefs = useRef([]);

  const dateDiffInDays = (date1, date2) => {
    const diffInMs = new Date(date1).getTime() - new Date(date2).getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  };

  const notifyApproachingDate = (projectName, daysLeft, approachingType) => {
    const daysWord = daysLeft === 1 ? 'day' : 'days';
    const message = `Approaching ${approachingType} for "${projectName}". Only ${daysLeft} ${daysWord} left.`;
    const toastRef = toast.info(message);
    toastRefs.current.push(toastRef);
  };

  useEffect(() => {
    const currentDate = new Date();
    projects.forEach((project) => {
      const daysUntilStart = dateDiffInDays(project.startDate, currentDate);
      const daysUntilDue = dateDiffInDays(project.dueDate, currentDate);

      if (daysUntilStart <= 2 && currentDate < new Date(project.startDate)) {
        if (!notifiedProjectsRef.current.includes(project.name)) {
          notifyApproachingDate(project.name, daysUntilStart, 'start date');
          notifiedProjectsRef.current.push(project.name);
        }
      } else if (daysUntilDue <= 2 && currentDate >= new Date(project.startDate)) {
        if (!notifiedProjectsRef.current.includes(project.name)) {
          notifyApproachingDate(project.name, daysUntilDue, 'due date');
          notifiedProjectsRef.current.push(project.name);
        }
      }
    });
  }, [projects]);

  const handleDeleteProject = (index) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this project?');
    if (shouldDelete) {
      deleteProject(index);
    }
  };

  const userProjects = projects.filter((project) => project.addedBy === username);

  return (
    <div>
      <h2>View Current Projects</h2>
      {userProjects.length === 0 ? (
        <p>You have no projects, take care</p>
      ) : (
        <ul>
          {userProjects.map((project, index) => (
            <li key={index}>
              {project.name}
              {project.name && project.description && (
                <span> (Start: {project.startDate}, Due: {project.dueDate})</span>
              )}
              {authenticated && project.name && project.description && (
                <button onClick={() => handleDeleteProject(index)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewProjects;
