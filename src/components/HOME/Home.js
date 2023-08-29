import './home.css';
import { Link } from 'react-router-dom';



export default function Home() {
 

  
  return (
    <div className="text-center mx-auto fixed bottom-0 right-0 left-0 md:w-1/2 bg-gray-900 p-6 text-white">
      <div className="flex items-center mb-4">
        
      </div>
      <h1 className="font-extrabold text-4xl mb-4">Task Management & To-Do List</h1>
      <p className="font-semibold text-lg md:text-2xl mb-6 text-purple-600">
        This project is crafted to provide you with a convenient way to effectively manage your tasks based on different projects
      </p>
      <Link to="/PROJECTS/Projects">
        <button className="px-6 py-2 md:px-10 md:py-3 bg-purple-600 text-white rounded-xl">
          Let's Start
        </button>
      </Link>
    </div>
  );
}
