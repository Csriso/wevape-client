import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context.js'
import { UtilityContext } from '../context/utility.context.js'
import { BsPlusLg } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { getProfileService } from '../services/profile.services.js';

export default function LeftBar() {

    const { newStoryForm, setNewStoryForm, profilePic, setProfilePic } = useContext(UtilityContext)
    const { user, authenticateUser, completeUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const changeFormVisibility = () => {
        if (location.pathname !== "/") {
            navigate("/");
            setNewStoryForm(true);
        } else {
            setNewStoryForm(!newStoryForm);
        }
    }

    const getProfilePic = async () => {
        if (profilePic === null || !profilePic || profilePic === undefined || profilePic === "") {
            const response = await getProfileService(user.username);
            setProfilePic(response.data.imageUrl);
        }
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        authenticateUser();
    }
    useEffect(() => {
        getProfilePic();
    }, [])

    return (
        <>
            <div id='LeftBarHolder' className='w-1/6'></div>
            <div id='LeftBar' className='w-1/6 fixed'>
                <div className="flex flex-col w-full h-screen px-4 py-8 bg-black border-r border-gray-600">
                    <Link to="/" className='w-11/12 m-0 self-center flex flex-row justify-center items-center align-center justify-items-center w-full justify-items-center content-center items-center align-center'><img src="/logo.png" alt="" onClick={() => navigate("/")} /></Link>
                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <div className="flex flex-col ">
                            <button onClick={changeFormVisibility} className="mb-5 flex items-center px-4 py-2 text-gray-700 hover:bg-gray-700 rounded-md text-gray-200">
                                <BsPlusLg />
                                <span className="mx-4 font-medium">New Story</span>
                            </button>
                            <button onClick={() => { navigate("/"); setNewStoryForm(false) }} className="mb-5 flex items-center px-4 py-2 text-gray-700 hover:bg-gray-700 rounded-md text-gray-200">
                                <AiFillHome />
                                <span className="mx-4 font-medium">My feed</span>
                            </button>
                            <button onClick={() => { navigate("/discover"); setNewStoryForm(false) }} className="mb-5 flex items-center px-4 py-2 text-gray-700 hover:bg-gray-700 rounded-md text-gray-200">
                                <BiWorld />
                                <span className="mx-4 font-medium">Discover</span>
                            </button>
                        </div>
                        <div className="flex flex-row justify-between items-center px-4 -mx-2">
                            {user && (
                                <>
                                    <div className="flex" onClick={() => { navigate("/profile") }}>
                                        <img className="object-cover mx-2 rounded-full h-9 w-9" src={profilePic ? profilePic : "/defAvatar.png"} alt="avatar" />
                                        <h4 className="mx-2 font-medium text-gray-200 hover:underline">{completeUser.username ? completeUser.username : completeUser.email}</h4>
                                    </div>
                                    <div className="flex">
                                        <button type="button" onClick={logout} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
