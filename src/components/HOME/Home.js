import './home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import maleIcon from '../images/maleIcon.png';
import femaleIcon from '../images/femaleIcon.png';

export default function Home({ authenticated, handleSignOut, gender, profilePic, username }) {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    handleSignOut();
    navigate('/');
  };

  const defaultProfilePic = profilePic || (gender === 'male' ? maleIcon : femaleIcon);

  return (
    <div className="text-center mx-auto fixed bottom-0 right-0 left-0 md:w-1/2 bg-gray-900 p-6 text-white">
      <div className="flex items-center mb-4">
        <img src={defaultProfilePic} alt="Profile Pic" className="w-10 h-10 mr-2" />
        <h3>{username}</h3>
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
      {authenticated && (
        <button
          className="mt-4 px-6 py-2 md:px-10 md:py-3 bg-red-600 text-white rounded-xl"
          onClick={handleSignOutClick}
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
