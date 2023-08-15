import './home.css'
import { Link } from 'react-router-dom';
export default function Home(){
  return(
    <>
      <div className='text-center mx-auto fixed bottom-20 text-white   right-10 left-10 md:w-1/2 '>
        <h1 className='font-extrabold text-4xl'>Task Management & To-Do List</h1>
        <p className='font-semibold text-2xl py-10 text-purple-600'>This project is crafted to provide you with a convenient way to effectively 
          manage your tasks based on different projects
        </p>
        <Link to='/PROJECTS/Projects'>
          <button className='px-10 py-2 bg-purple-600 text-white rounded-xl'>Let's Start</button>
        </Link>
        
      </div>
    </>
  )
}