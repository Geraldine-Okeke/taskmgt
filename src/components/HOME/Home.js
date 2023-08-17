import './home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import maleIcon from '../images/maleIcon.png'
import femaleIcon from '../images/femaleIcon.png'

export default function Home({ authenticated, handleSignOut,gender, profilePic, username }) {
  const navigate = useNavigate();
  console.log("Profile Pic:", profilePic);
  console.log("Username:", username);
  const handleSignOutClick = () => {
    handleSignOut();
    navigate('/');
  };

  const defaultProfilePic =
    profilePic || (gender === 'male' ? maleIcon : femaleIcon);

  return (
    <>
      <div className='text-center mx-auto fixed bottom-20 text-white   right-10 left-10 md:w-1/2 '>
        <div className="flex items-center">
          <img src={defaultProfilePic} alt="Profile Pic" className="w-10 h-10 mr-2" />
          <h3>{username}</h3>
        </div>
        <h1 className='font-extrabold text-4xl'>Task Management & To-Do List</h1>
        <p className='font-semibold text-2xl py-10 text-purple-600'>
          This project is crafted to provide you with a convenient way to effectively manage your tasks based on different projects
        </p>
        <Link to='/PROJECTS/Projects'>
          <button className='px-10 py-2 bg-purple-600 text-white rounded-xl'>Let's Start</button>
        </Link>
        {authenticated && (
          <button className='px-10 py-2 mt-4 bg-red-600 text-white rounded-xl' onClick={handleSignOutClick}>
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}
