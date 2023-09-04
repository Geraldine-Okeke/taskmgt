import React, { useEffect, useState, useRef } from "react";
import { useProjects } from "./ProjectsContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function ViewProjects() {
  const { projects, deleteProject, setProjects } = useProjects();
  const [calendarAspectRatio, setCalendarAspectRatio] = useState(1);

  const calendarRef = useRef(null);

  const loggedProjectIds = useRef(false); 

  const [editingProjectId, setEditingProjectId] = useState(null);

  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [editingSteps, setEditingSteps] = useState([]);
  const [newStepName, setNewStepName] = useState("");
  
  const handleEditClick = (projectId) => {
    const projectToEdit = projects.find((project) => project.id === projectId);
    setEditedName(projectToEdit.name);
    setEditedDescription(projectToEdit.description);
    setEditedStartDate(projectToEdit.startDate);
    setEditedDueDate(projectToEdit.dueDate);
    setEditingProjectId(projectId);
    setEditingSteps(projectToEdit.steps);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const projectToEdit = projects.find(
      (project) => project.id === editingProjectId
    );

    projectToEdit.name = editedName;
    projectToEdit.description = editedDescription;
    projectToEdit.startDate = editedStartDate;
    projectToEdit.dueDate = editedDueDate;
    projectToEdit.steps = editingSteps;

    setProjects([...projects]);

    setEditingProjectId(null);
    setEditedName("");
    setEditedDescription("");
    setEditedStartDate("");
    setEditedDueDate("");
    setEditingSteps([]);
  };
  
const handleAddStep = () => {
  if (newStepName.trim() !== "") {
    setEditingSteps([...editingSteps, { name: newStepName, completed: false }]);
   
  }
};
  const handleRemoveStep = (stepIndex) => {
    const updatedSteps = [...editingSteps];
    updatedSteps.splice(stepIndex, 1);
    setEditingSteps(updatedSteps);
  };
  const handleEditToggleStep = (stepIndex) => {
    const updatedSteps = [...editingSteps];
    updatedSteps[stepIndex].completed = !updatedSteps[stepIndex].completed;
    setEditingSteps(updatedSteps);
    
  };
  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setEditedName("");
    setEditedDescription("");
    setEditedStartDate("");
    setEditedDueDate("");
    
  };

  useEffect(() => {
    if (!loggedProjectIds.current) {
      projects.forEach((project) => {
        console.log("Project ID:", project.id);
      });
      loggedProjectIds.current = true; 
    }
  }, [projects]);
  
  useEffect(() => {
    
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
    const savedProjects = JSON.parse(
      localStorage.getItem("savedProjects") || "[]"
    );
    setProjects(savedProjects); 
  }, [setProjects]);

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

  const calendarEvents = projects.map((project) => {
    const completedSteps = project.steps.filter((step) => step.completed)
      .length;
    const totalSteps = project.steps.length;
    const progressPercentage = calculatePercentage(
      completedSteps,
      totalSteps
    );

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
      <div className="text-xs font-semibold">{formattedDate}</div>
    );
  };
  const sortedProjects = [...projects].sort((a, b) => {
    const startDateA = new Date(a.startDate);
    const startDateB = new Date(b.startDate);
    return startDateA - startDateB;
  });

  return (
    <>
      <div className="w-screen h-1/2 md:h-2/4 overflow-hidden pt-10">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          dayCellContent={dayCellContent}
          aspectRatio={calendarAspectRatio}
          dayMaxEventRows={true}
        />
      </div>

      <div className="p-4 space-y-4 mt-20">
        <h2 className="text-xl font-semibold">View Current Projects</h2>
        {sortedProjects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          <ul className="space-y-4">
             {sortedProjects.map((project, projectIndex) => {
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
                  className="border rounded p-2 md:p-4 space-y-4"
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
                    </div>

                    {/* Edit button */}
                    <button
                      onClick={() => handleEditClick(project.id)}
                      className="text-green-500 hover:underline focus:outline-none"
                    >
                      Edit
                    </button>
                  </div>

                  {project.name && project.description && (
                    <span className="text-gray-600 mt-2 md:mt-0 md:ml-2">
                      (Start: {project.startDate}, Due: {project.dueDate})
                      {progressPercentage === 100 && (
                        <span className="text-green-600 ml-2">
                          (Completed)
                        </span>
                      )}
                    </span>
                  )}

                  {project.name && project.description && (
                    <div className="flex flex-col space-y-2 mt-2">
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
                    <ul className="space-y-2 mt-2">
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

                  {/* Edit form */}
                  {editingProjectId === project.id && (
                    <form onSubmit={handleEditSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Edit Name"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="description"
                          placeholder="Edit Description"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </div>
                      <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                            Start Date
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="startDate"
                            type="date"
                            placeholder="Edit Start Date"
                            value={editedStartDate}
                            onChange={(e) => setEditedStartDate(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 pl-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                            Due Date
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dueDate"
                            type="date"
                            placeholder="Edit Due Date"
                            value={editedDueDate}
                            onChange={(e) => setEditedDueDate(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Edit steps */}
                      <ul className="space-y-2 mt-2">
                        {editingSteps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={step.completed}
                              onChange={() => handleEditToggleStep(stepIndex)}
                              className="form-checkbox text-blue-500 focus:ring-blue-400"
                            />
                            <span>{step.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveStep(stepIndex)}
                              className="text-red-500 hover:underline focus:outline-none"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          placeholder="New Step Name"
                          value={newStepName}
                          onChange={(e) => setNewStepName(e.target.value)}
                          className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button
                          type='button'
                          onClick={handleAddStep}
                          className="bg-blue-500 text-white py-2 px-3 rounded focus:outline-none hover:bg-blue-600 ml-2"
                        >
                          Add Step
                        </button>
                      </div>
                      <div className="flex items-center mt-4">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600 focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
                      >
                        Save
                      </button>
                      </div>
                    </form>
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