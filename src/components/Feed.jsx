import React, { useContext } from 'react'
import Post from './Post'
import { UtilityContext } from '../context/utility.context.js'

export default function Feed() {

  const { newStoryForm } = useContext(UtilityContext)

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="w-4/6 flex flex-col">
      {newStoryForm &&
        <div className='flex flex-col justify-center justify-items-center content-center px-5 border-b dark:border-gray-600'>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-center justify-items-center content-center items-center">
              <input type="text" name="newPost" className="mt-5 w-5/6 py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Add new story" />
              <button className='self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Submit</button>

            </div>
          </form>
          <br />
        </div>
      }
    </div>
  )
}
