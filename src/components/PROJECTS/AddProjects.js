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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">Steps</h3>
        {steps.map((step, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder={`Step ${index + 1}`}
              value={step.name}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddStep} className="px-4 py-2 text-white bg-blue-500 rounded">
          Add Step
        </button>
      </div>
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
        Add Project
      </button>
    </form>
  );
  
}

export default AddProjects;
