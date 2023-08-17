import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Welcome to Our App!</h1>
      <div className="flex space-x-4">
        <Link to="/AUTH/SignIn" className="px-4 py-2 bg-blue-500 text-white rounded">
          Sign In
        </Link>
        <Link to="/AUTH/SignUp" className="px-4 py-2 bg-green-500 text-white rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
