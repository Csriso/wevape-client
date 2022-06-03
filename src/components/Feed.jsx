import React, { useContext, useEffect, useRef, useState } from 'react'
import { UtilityContext } from '../context/utility.context.js'
import { newPostService, getAllPostsService } from '../services/post.services'
import { AuthContext } from '../context/auth.context'
import { ClipLoader } from 'react-spinners';
import { BsImageFill } from 'react-icons/bs'
import gsap from 'gsap';

export default function Feed() {
  // States
  const [newMessage, setNewMessage] = useState(null);
  const [posts, setPosts] = useState(null);
  //Contexts
  const { newStoryForm } = useContext(UtilityContext)
  const { user } = useContext(AuthContext)
  //Handlers
  const handleNewMessageChange = (e) => { setNewMessage(e.target.value) }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const data = {
        user,
        newMessage
      }
      const response = newPostService(data);
      getPosts();
    } catch (error) {

    }
  }
  //UseEffects
  useEffect(() => {
    getPosts();
  }, [])

  // Get Posts
  const getPosts = async () => {
    try {
      const response = await getAllPostsService();
      console.log(response.data);
      setPosts(response.data)
    } catch (error) {

    }
  }

  // REFs
  const boxRef = useRef();

  return (
    <div className="w-4/6 flex flex-col">
      {newStoryForm &&
        <div ref={boxRef} className='mt-5 flex flex-col justify-center justify-items-center content-center px-5 border-b dark:border-gray-600'>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center justify-items-center content-center items-center">
              <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center">
                <input onChange={handleNewMessageChange} type="text" name="newPost" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Add new story" />
              </div>
              <div className="w-5/6 mt-3 flex flex-row justify-between justify-items-center content-center items-center align-center">
                <div className='p-3 rounded-lg bg-gray-700'><BsImageFill /></div>
                <div>
                  <button className='self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Submit</button>
                </div>
              </div>
            </div>
          </form>
          <br />
        </div>
      }
      {posts === null && <ClipLoader />}
      {posts !== null && posts.map(elem => {
        return (
          <div className='flex flex-col'>
            <div className="flex flex-row">

            </div>
            <p>{elem.message}</p>
            <br />
          </div>
        )
      })}
    </div>

  )
}
