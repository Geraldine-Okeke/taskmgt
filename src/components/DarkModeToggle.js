import React, { useState, useEffect } from 'react';

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="dark-mode-toggle">
      <label htmlFor="darkModeToggle" className="switch">
        <input
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={handleToggle}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default DarkModeToggle;
