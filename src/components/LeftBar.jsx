import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context.js'
import { UtilityContext } from '../context/utility.context.js'
import { BsPlusLg } from 'react-icons/bs';

export default function LeftBar() {

    const { newStoryForm, setNewStoryForm } = useContext(UtilityContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const changeFormVisibility = () => {
        if (location.pathname === "/profile") {
            navigate("/");
            setNewStoryForm(true);
        } else {
            setNewStoryForm(!newStoryForm);
        }

    }

    return (
        <div id='LeftBar' className='w-1/6'>
            <div className="flex flex-col w-full h-screen px-4 py-8 bg-black border-r dark:border-gray-600">
                <img src="logo.png" alt="" />


                <div className="flex flex-col justify-between flex-1 mt-6">
                    {/* CLICKED flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 */}
                    {/* NO CLICKED flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 */}
                    <button onClick={changeFormVisibility} className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200">
                        <BsPlusLg />
                        <span className="mx-4 font-medium">New Story</span>
                    </button>



                    <div className="flex items-center px-4 -mx-2" onClick={() => navigate("/profile")}>
                        <img className="object-cover mx-2 rounded-full h-9 w-9" src={user.image ? user.image : "/defAvatar.png"} alt="avatar" />
                        <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{user.username ? user.username : user.email}</h4>
                        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
