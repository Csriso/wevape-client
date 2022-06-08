import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context.js'
import { UtilityContext } from '../context/utility.context.js'
import { BsPlusLg } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';

export default function LeftBar() {

    const { newStoryForm, setNewStoryForm } = useContext(UtilityContext)
    const { user } = useContext(AuthContext)
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
                            <button onClick={() => navigate("/")} className="mb-5 flex items-center px-4 py-2 text-gray-700 hover:bg-gray-700 rounded-md text-gray-200">
                                <AiFillHome />
                                <span className="mx-4 font-medium">My feed</span>
                            </button>
                            <button onClick={() => navigate("/discover")} className="mb-5 flex items-center px-4 py-2 text-gray-700 hover:bg-gray-700 rounded-md text-gray-200">
                                <BiWorld />
                                <span className="mx-4 font-medium">Discover</span>
                            </button>
                        </div>
                        <div className="flex items-center px-4 -mx-2" onClick={() => { navigate("/profile") }}>
                            {user && (
                                <>
                                    <img className="object-cover mx-2 rounded-full h-9 w-9" src={user.image ? user.image : "/defAvatar.png"} alt="avatar" />
                                    <h4 className="mx-2 font-medium text-gray-200 hover:underline">{user.username ? user.username : user.email}</h4>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
