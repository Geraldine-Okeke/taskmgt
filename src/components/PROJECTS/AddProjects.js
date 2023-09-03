import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useProjects } from './ProjectsContext'; 
import { v4 as uuidv4 } from 'uuid';

function AddProjects() {
  const { addProject } = useProjects(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [steps, setSteps] = useState([]);
  const [stepInput, setStepInput] = useState('');

  // Load saved steps from Local Storage on component mount
  useEffect(() => {
    const savedSteps = JSON.parse(localStorage.getItem('savedSteps') || '[]');
    setSteps(savedSteps);
  }, []);

  // Save steps to Local Storage whenever the steps state changes
  useEffect(() => {
    localStorage.setItem('savedSteps', JSON.stringify(steps));
  }, [steps]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && description) {
      const projectId = uuidv4(); // Generate a unique projectId
      addProject(projectId, name, description, startDate, dueDate, steps);

      // Pass projectId to ViewProject.js
      // You can use console.log here to log the projectId
      console.log('projectId:', projectId);

      setName('');
      setDescription('');
      setStartDate('');
      setDueDate('');
      setSteps([]);


      // Clear saved steps from Local Storage after adding the project
      localStorage.removeItem('savedSteps');

      toast.success('Project added successfully!');
    } else {
      toast.error('Please provide both project name and description.');
    }
  };

  const handleAddStep = () => {
    if (steps.length < 30 && stepInput.trim() !== '') {
      setSteps([...steps, { name: stepInput, completed: false }]);
      setStepInput('');
    } else if (stepInput.trim() === '') {
      toast.error('Step input is empty. Please enter a step before adding.');
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
              id="step"
              type="text"
              placeholder={`Step ${index + 1}`}
              value={step.name}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <input
          type="text"
          placeholder="Enter step"
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleAddStep}
          className="px-4 py-2  bg-blue-500 rounded"
          disabled={stepInput.trim() === '' || steps.length >= 30}
        >
          Add Step
        </button>
        {steps.length === 0 && (
          <p className="text-red-500">Please add a step before clicking "Add Step".</p>
        )}
      </div>
      <label htmlFor="Sdate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          id="Sdate"
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mb-2 p-2 md:p-4 border rounded"
        />

        <label htmlFor="Ddate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          id="Ddate"
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-2 p-2 md:p-4 border rounded"
        />

      <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
        Add Project
      </button>
    </form>
  );
}

export default AddProjects;
