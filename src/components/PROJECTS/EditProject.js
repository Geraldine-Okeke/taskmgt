import React, { useState } from "react";

function EditProject({ project, onSave, onCancel }) {
  const [editedProject, setEditedProject] = useState(project);

  const handleStepNameChange = (stepIndex, newName) => {
    const updatedSteps = [...editedProject.steps];
    updatedSteps[stepIndex].name = newName;
    setEditedProject({ ...editedProject, steps: updatedSteps });
  };

  const handleAddStep = () => {
    const updatedSteps = [...editedProject.steps, { name: "" }];
    setEditedProject({ ...editedProject, steps: updatedSteps });
  };

  const handleDeleteStep = (stepIndex) => {
    const updatedSteps = [...editedProject.steps];
    updatedSteps.splice(stepIndex, 1);
    setEditedProject({ ...editedProject, steps: updatedSteps });
  };

  const handleStartDateChange = (newStartDate) => {
    setEditedProject({ ...editedProject, startDate: newStartDate });
  };

  const handleDueDateChange = (newDueDate) => {
    setEditedProject({ ...editedProject, dueDate: newDueDate });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl text-orange-500 mb-4">Edit Project</h2>
      <form>
        <input
          type="text"
          placeholder="Project Name"
          value={editedProject.name}
          onChange={(e) =>
            setEditedProject({ ...editedProject, name: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />

        {editedProject.steps.map((step, stepIndex) => (
          <div key={stepIndex} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Step ${stepIndex + 1}`}
              value={step.name}
              onChange={(e) => handleStepNameChange(stepIndex, e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => handleDeleteStep(stepIndex)}
              className="text-red-500 ml-2"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddStep}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Step
        </button>

        <label htmlFor="startDate" className="mt-4 block">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          placeholder="Start Date"
          value={editedProject.startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <label htmlFor="dueDate" className="block">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          placeholder="Due Date"
          value={editedProject.dueDate}
          onChange={(e) => handleDueDateChange(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-between">
          <button
            onClick={() => onSave(editedProject)}
            className="w-1/2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="w-1/2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
