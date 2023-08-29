import React, { useEffect, useState } from 'react';
import { useProjects } from './ProjectsContext';

function ViewProjects() {
  const { projects, deleteProject, setProjects } = useProjects();

  const handleToggleStep = (projectIndex, stepIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].steps[stepIndex].completed = !updatedProjects[projectIndex].steps[stepIndex].completed;
    setProjects(updatedProjects);
  };

  const calculatePercentage = (completedSteps, totalSteps) => {
    if (totalSteps === 0) {
      return 0;
    }
    return (completedSteps / totalSteps) * 100;
  };

  const [visibleSteps, setVisibleSteps] = useState({});
  const [animatedProgress, setAnimatedProgress] = useState({});

  const handleDeleteProject = (index) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this project?');
    if (shouldDelete) {
      const updatedProjects = projects.filter((_, projectIndex) => projectIndex !== index);
      setProjects(updatedProjects);
    }
  };

  const animateProgress = (projectIndex, progress) => {
    setAnimatedProgress((prevProgress) => ({ ...prevProgress, [projectIndex]: 0 }));
    let currentProgress = 0;
    const animationInterval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= progress) {
        clearInterval(animationInterval);
      }
      setAnimatedProgress((prevProgress) => ({ ...prevProgress, [projectIndex]: currentProgress }));
    }, 20); 
  };

  useEffect(() => {
    projects.forEach((project, projectIndex) => {
      const completedSteps = project.steps.filter((step) => step.completed).length;
      const totalSteps = project.steps.length;
      const progressPercentage = calculatePercentage(completedSteps, totalSteps);

      if (animatedProgress[projectIndex] !== undefined) {
        animateProgress(projectIndex, progressPercentage);
      }
    });
  }, [animatedProgress, projects]);

  useEffect(() => {
    projects.forEach((project, projectIndex) => {
      const completedSteps = project.steps.filter((step) => step.completed).length;
      const totalSteps = project.steps.length;
      const progressPercentage = calculatePercentage(completedSteps, totalSteps);

      if (progressPercentage === 100) {
        const Delete = window.confirm('This project is completed, should it be deleted ?');
        if (Delete){
          deleteProject(projectIndex);
        }
        
      }
    });
  }, [projects, deleteProject]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">View Current Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project, projectIndex) => {
            const completedSteps = project.steps.filter((step) => step.completed).length;
            const totalSteps = project.steps.length;
            const progressPercentage = calculatePercentage(completedSteps, totalSteps);

            return (
              <li key={projectIndex} className="border rounded p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <button onClick={() => setVisibleSteps((prevVisibleSteps) => ({ ...prevVisibleSteps, [projectIndex]: !prevVisibleSteps[projectIndex] }))} className="text-blue-500 hover:underline focus:outline-none">
                    Project Name: {project.name}
                  </button>
                  
                  {project.name && project.description && (
                    <span className="text-gray-600"> (Start: {project.startDate}, Due: {project.dueDate})</span>
                  )}
                </div>
                {project.name && project.description && (
                  <div className="flex flex-col space-y-2">
                    <p>Project Descrption: {project.description}</p>
                    <button onClick={() => handleDeleteProject(projectIndex)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none">
                      Delete Project
                    </button>
                    <span className="text-green-600">Progress: {animatedProgress[projectIndex] !== undefined ? animatedProgress[projectIndex] : progressPercentage.toFixed(2)}%</span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        style={{
                          width: `${animatedProgress[projectIndex] !== undefined ? animatedProgress[projectIndex] : progressPercentage}%`,
                        }}
                        className="h-full bg-blue-500 rounded transition-width duration-200"
                      ></div>
                    </div>
                  </div>
                )}

                {visibleSteps[projectIndex] && project.steps && (
                  <ul className="space-y-2">
                    {project.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => handleToggleStep(projectIndex, stepIndex)}
                            className="form-checkbox text-blue-500 focus:ring-blue-400"
                          />
                          <span>{step.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ViewProjects;
