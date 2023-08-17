import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useProjects } from './ProjectsContext'; 

function AddProjects() {
  const { addProject } = useProjects(); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && description) {
      addProject(name, description, startDate, dueDate); 
      setName('');
      setDescription('');
      setStartDate('');
      setDueDate('');

      toast.success('Project added successfully!');
    } else {
      toast.error('Please provide both project name and description.');
    }
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
      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProjects;
