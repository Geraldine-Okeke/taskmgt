import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useProjects } from './ProjectsContext'; 

function AddProjects() {
  const { addProject } = useProjects(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [steps, setSteps] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && description) {
      addProject(name, description, startDate, dueDate, steps);
      setName('');
      setDescription('');
      setStartDate('');
      setDueDate('');
      setSteps([]);

      toast.success('Project added successfully!');
    } else {
      toast.error('Please provide both project name and description.');
    }
  };

  const handleAddStep = () => {
    if (steps.length < 10) {
      setSteps([...steps, { name: '', completed: false }]);
    } else {
      toast.error('Maximum number of steps reached.');
    }
  };

  const handleStepChange = (index, newName) => {
    const updatedSteps = [...steps];
    updatedSteps[index].name = newName;
    setSteps(updatedSteps);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div>
        <h3>Steps</h3>
        {steps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Step ${index + 1}`}
              value={step.name}
              onChange={(e) => handleStepChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddStep}>
          Add Step
        </button>
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProjects;
