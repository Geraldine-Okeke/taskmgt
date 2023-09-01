import React, { useEffect, useState,useRef } from "react";
import { useProjects } from "./ProjectsContext";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EditProjectModal from "./EditProjectModal"
function ViewProjects() {
  const { projects, deleteProject, setProjects } = useProjects();
  const [calendarAspectRatio, setCalendarAspectRatio] = useState(1);

  const calendarRef = useRef(null);

  useEffect(() => {
    // Calculate and set the aspect ratio based on the screen width
    const screenWidth = window.innerWidth;

    if (screenWidth < 540) {
      setCalendarAspectRatio(1);
    } else {
      setCalendarAspectRatio(3);
    }
  }, []);
  const [editingProject, setEditingProject] = useState(null);
  const handleEditProject = (editedProject) => {
    const projectIndex = projects.findIndex(
      (project) => project.id === editedProject.id
    );

    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = editedProject;
      setProjects(updatedProjects);
      setEditingProject(null); 
    }
  };
  const handleToggleStep = (projectIndex, stepIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].steps[stepIndex].completed =
      !updatedProjects[projectIndex].steps[stepIndex].completed;
    setProjects(updatedProjects);
  };
  useEffect(() => {
    // Load saved projects from Local Storage on component mount
    const savedProjects = JSON.parse(
      localStorage.getItem("savedProjects") || "[]"
    );
    setProjects(savedProjects); // Load projects into state
  }, [setProjects]);
  // Save projects to Local Storage whenever the projects state changes
  useEffect(() => {
    localStorage.setItem("savedProjects", JSON.stringify(projects));
  }, [projects]);

  const calculatePercentage = (completedSteps, totalSteps) => {
    if (totalSteps === 0) {
      return 0;
    }
    return (completedSteps / totalSteps) * 100;
  };

  const [visibleSteps, setVisibleSteps] = useState({});
  const [animatedProgress, setAnimatedProgress] = useState({});

  const handleDeleteProject = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (shouldDelete) {
      deleteProject(index);
    }
  };
  const animateProgress = (projectIndex, progress) => {
    setAnimatedProgress((prevProgress) => ({
      ...prevProgress,
      [projectIndex]: 0,
    }));
    let currentProgress = 0;
    const animationInterval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= progress) {
        clearInterval(animationInterval);
      }
      setAnimatedProgress((prevProgress) => ({
        ...prevProgress,
        [projectIndex]: currentProgress,
      }));
    }, 20);
  };
  useEffect(() => {
    projects.forEach((project, projectIndex) => {
      const completedSteps = project.steps.filter(
        (step) => step.completed
      ).length;
      const totalSteps = project.steps.length;
      const progressPercentage = calculatePercentage(
        completedSteps,
        totalSteps
      );

      if (animatedProgress[projectIndex] !== undefined) {
        animateProgress(projectIndex, progressPercentage);
      }
    });
  }, [animatedProgress, projects]);

  

  // Format projects data into an array of events for FullCalendar
  const calendarEvents = projects.map((project) => {
    const completedSteps = project.steps.filter((step) => step.completed).length;
    const totalSteps = project.steps.length;
    const progressPercentage = calculatePercentage(completedSteps, totalSteps);

   
    const isCompleted = progressPercentage === 100;

    
    const projectTitle = isCompleted
      ? `${project.name} (Completed)`
      : project.name;

    return {
      title: projectTitle,
      start: project.startDate,
      
    };
  });
  const dayCellContent = (arg) => {
    const date = new Date(arg.date);
    const formattedDate = date.getDate();

    return (
      <div className="text-xs font-semibold">
        {formattedDate}
        {/* You can add more styles or content here */}
      </div>
    );
  };
  


  return (
    <>
     <div className="w-screen h-1/2 md:h-2/4 overflow-hidden">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          className={`w-full h-64 responsive-calendar`}
          events={calendarEvents}
          dayCellContent={dayCellContent}
          aspectRatio={calendarAspectRatio}
          dayMaxEventRows={true}
        />
      </div>

      <div className="p-4 space-y-4 mt-20">
      <h2 className="text-xl font-semibold">View Current Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project, projectIndex) => {
            const completedSteps = project.steps.filter(
              (step) => step.completed
            ).length;
            const totalSteps = project.steps.length;
            const progressPercentage = calculatePercentage(
              completedSteps,
              totalSteps
            );

            return (
              <li key={projectIndex} className="border rounded p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      setVisibleSteps((prevVisibleSteps) => ({
                        ...prevVisibleSteps,
                        [projectIndex]: !prevVisibleSteps[projectIndex],
                      }))
                    }
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Project Name: {project.name}
                  </button>
                  {editingProject && (
                      <EditProjectModal
                        project={editingProject}
                        onSave={handleEditProject}
                        onCancel={() => setEditingProject(null)}
                      />
                    )}
                  {project.name && project.description && (
                      <span className="text-gray-600">
                        {" "}
                        (Start: {project.startDate}, Due: {project.dueDate})
                        {progressPercentage === 100 && (
                          <span className="text-green-600 ml-2">(Completed)</span>
                        )}
                      </span>
                    )}
                </div>
                {project.name && project.description && (
                  <div className="flex flex-col space-y-2">
                    <p>Project Descrption: {project.description}</p>
                    <button
                      onClick={() => handleDeleteProject(projectIndex)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none"
                    >
                      Delete Project
                    </button>
                    
                    <span className="text-green-600">
                      Progress:{" "}
                      {animatedProgress[projectIndex] !== undefined
                        ? animatedProgress[projectIndex]
                        : progressPercentage.toFixed(2)}
                      %
                    </span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        style={{
                          width: `${
                            animatedProgress[projectIndex] !== undefined
                              ? animatedProgress[projectIndex]
                              : progressPercentage
                          }%`,
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
                            onChange={() =>
                              handleToggleStep(projectIndex, stepIndex)
                            }
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
    </>
    
  );
}

export default ViewProjects;
