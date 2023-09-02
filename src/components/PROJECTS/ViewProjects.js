import React, { useEffect, useState,useRef } from "react";
import { useProjects } from "./ProjectsContext";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EditProject from "./EditProject";
function ViewProjects() {
  const { projects, deleteProject, setProjects } = useProjects();
  const [calendarAspectRatio, setCalendarAspectRatio] = useState(1);

  const calendarRef = useRef(null);

  useEffect(() => {
    // Calculate and set the aspect ratio based on the screen width
    const screenWidth = window.innerWidth;

    if (screenWidth <= 540) {
      setCalendarAspectRatio(0.8);
    } else {
      setCalendarAspectRatio(4);
    }
  }, []);
 
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
  
  const [editingProject, setEditingProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = (projectToEdit) => {
    setEditingProject(projectToEdit);
    setIsEditModalOpen(true);
  };
  const handleSaveEditedProject = (editedProject) => {
    // Find the index of the edited project in the projects array
    const projectIndex = projects.findIndex((project) => project.id === editedProject.id);
  
    if (projectIndex !== -1) {
      // Create a copy of the projects array and replace the edited project
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = editedProject;
  
      // Update the projects state with the edited project
      setProjects(updatedProjects);
    }
  
    // Close the edit modal
    setIsEditModalOpen(false);
  };

  return (
    <>
     <div className="w-screen h-1/2 md:h-2/4 overflow-hidden pt-10">
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
              <li
              key={projectIndex}
              className="border rounded p-2 md:p-4 space-y-4" // Adjust padding for medium screens
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-2 md:mb-0">
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
                  <button
                    onClick={() => handleOpenEditModal(project)}
                    className="text-blue-500 hover:underline ml-10 focus:outline-none md:ml-2" // Add margin for medium screens
                  >
                    Edit
                  </button>
                </div>
                {isEditModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <EditProject
                        project={editingProject}
                        onSave={handleSaveEditedProject}
                        onCancel={() => setIsEditModalOpen(false)}
                      />
                    </div>
                  </div>
                )}

                {project.name && project.description && (
                  <span className="text-gray-600 mt-2 md:mt-0 md:ml-2"> {/* Adjust margin for medium screens */}
                    (Start: {project.startDate}, Due: {project.dueDate})
                    {progressPercentage === 100 && (
                      <span className="text-green-600 ml-2">(Completed)</span>
                    )}
                  </span>
                )}
              </div>
              {project.name && project.description && (
                <div className="flex flex-col space-y-2 mt-2"> {/* Adjust margin for medium screens */}
                  <p>Project Description: {project.description}</p>
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
                <ul className="space-y-2 mt-2"> {/* Adjust margin for medium screens */}
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
