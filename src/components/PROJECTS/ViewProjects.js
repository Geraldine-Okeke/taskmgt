import React, { useEffect, useState } from 'react';
import { useProjects } from './ProjectsContext';


function ViewProjects({ authenticated }) {
  const { projects, deleteProject, username, setProjects } = useProjects();

  

  const handleToggleStep = (projectIndex, stepIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].steps[stepIndex].completed = !updatedProjects[projectIndex].steps[stepIndex].completed;
    setProjects(updatedProjects);
  };

  const userProjects = projects.filter((project) => project.addedBy === username);

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
    }, 20); // Adjust the interval as needed for smoother animation
  };

  useEffect(() => {
    userProjects.forEach((project, projectIndex) => {
      const completedSteps = project.steps.filter(step => step.completed).length;
      const totalSteps = project.steps.length;
      const progressPercentage = calculatePercentage(completedSteps, totalSteps);

      if (animatedProgress[projectIndex] !== undefined) {
        animateProgress(projectIndex, progressPercentage);
      }
    });
  }, [animatedProgress, userProjects]);

  useEffect(() => {
    userProjects.forEach((project, projectIndex) => {
      const completedSteps = project.steps.filter(step => step.completed).length;
      const totalSteps = project.steps.length;
      const progressPercentage = calculatePercentage(completedSteps, totalSteps);

      if (progressPercentage === 100) {
        const shouldDelete = window.confirm(`The project "${project.name}" is marked as completed. Do you want to delete it?`);
        if (shouldDelete) {
          deleteProject(projectIndex);
        }
      }
    });
  }, [userProjects, deleteProject]);

  return (
    <div>
      <h2>View Current Projects</h2>
      {userProjects.length === 0 ? (
        <p>You have no projects, take care</p>
      ) : (
        <ul>
          {userProjects.map((project, projectIndex) => {
            const completedSteps = project.steps.filter(step => step.completed).length;
            const totalSteps = project.steps.length;
            const progressPercentage = calculatePercentage(completedSteps, totalSteps);

            return (
              <li key={projectIndex}>
                <button onClick={() => setVisibleSteps((prevVisibleSteps) => ({ ...prevVisibleSteps, [projectIndex]: !prevVisibleSteps[projectIndex] }))}>
                  {project.name}
                </button>
                {project.name && project.description && (
                  <span> (Start: {project.startDate}, Due: {project.dueDate})</span>
                )}
                {authenticated && project.name && project.description && (
                  <div>
                    <button onClick={() => handleDeleteProject(projectIndex)}>Delete Project</button>
                    <span>Progress: {animatedProgress[projectIndex] !== undefined ? animatedProgress[projectIndex] : progressPercentage.toFixed(2)}%</span>
                    <div style={{ width: '100%', height: '10px', backgroundColor: '#ccc', marginTop: '5px' }}>
                      <div
                        style={{
                          width: `${animatedProgress[projectIndex] !== undefined ? animatedProgress[projectIndex] : progressPercentage}%`,
                          height: '100%',
                          backgroundColor: '#00aaff',
                          transition: 'width 0.2s ease', // Add a smooth transition effect
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {visibleSteps[projectIndex] && project.steps && (
                  <ul>
                    {project.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>
                        <label>
                          <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => handleToggleStep(projectIndex, stepIndex)}
                          />
                          {step.name}
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
