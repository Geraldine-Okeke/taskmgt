import React, { useState } from "react";

function EditProject({ project, onSave, onCancel }) {
  const [editedProject, setEditedProject] = useState(project);

  const handleSave = () => {
    
    onSave(editedProject);
  };

  return (
    <div>
      <h2 className="text-orange-500">Edit Project</h2>
      <form>
        
        <input
          type="text"
          placeholder="Project Name"
          value={editedProject.name}
          onChange={(e) =>
            setEditedProject({ ...editedProject, name: e.target.value })
          }
        />
        
        {editedProject.steps.map((step, stepIndex) => (
          <input
            key={stepIndex}
            type="text"
            placeholder={`Step ${stepIndex + 1}`}
            value={step.name}
            onChange={(e) =>
              setEditedProject((prev) => {
                const updatedSteps = [...prev.steps];
                updatedSteps[stepIndex] = {
                  ...updatedSteps[stepIndex],
                  name: e.target.value,
                };
                return { ...prev, steps: updatedSteps };
              })
            }
          />
        ))}
        
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditProject;
