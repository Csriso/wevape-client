import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/auth.context'
import { ClipLoader } from 'react-spinners';
import { BsImageFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { uploadImage } from '../services/util.services'
import uuid from 'react-uuid';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Group from '../components/Group.jsx';
import { getAllGroupsService, newGroupService } from '../services/groups.services.js';
import gsap from 'gsap'

export default function Groups(props) {

    // States
    const [groups, setGroups] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [newGroupForm, setNewGroupForm] = useState(false);
    //Contexts
    const { authenticateUser } = useContext(AuthContext)
    //Location
    const location = useLocation();
    //Navigate
    const navigate = useNavigate();
    //Handlers

    // Form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (fileImage !== null) {
                const uploadData = new FormData();
                uploadData.append("imageUrl", fileImage);
                const imageUrl = await uploadImage(uploadData);
                data = {
                    name: groupNameRef.current.value,
                    description: groupDescription.current.value,
                    imageUrl: imageUrl.data.fileUrl
                }
            } else {
                data = {
                    name: groupNameRef.current.value,
                    description: groupDescription.current.value,
                }
            }
            await newGroupService(data);
            await getGroups();
            setNewGroupForm(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            navigate("/error");
        }
    }

    // File input change / click
    const handleFileChange = (e) => { setFileImage(e.target.files[0]); }
    const handleInputClick = (e) => { inputFile.current.click() }

    //UseEffects
    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        authenticateUser();
    }, [location])

    // Get Posts
    const getGroups = async () => {
        try {
            const response = await getAllGroupsService();
            setGroups(response.data)
        } catch (error) {
            navigate("/error");
        }
    }

    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };

    // REFs
    const inputFile = useRef(null);
    const groupNameRef = useRef(null);
    const groupDescription = useRef(null);

    // Render
    return (
        <div className="w-4/6 flex flex-col">
            {(groups && groups.length !== 0) && <button onClick={() => setNewGroupForm(!newGroupForm)} type="submit" className='mt-8 z-0 self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>New Group</button>}
            {/* Add story form */}
            {newGroupForm &&
                <div style={{ width: "inherit" }} className='fixed z-20 top-0 w-auto bg-black pt-5 mb-5 flex flex-col justify-center justify-items-center content-center px-5 border-b border-gray-600'>
                    <ImCross onClick={() => setNewGroupForm(false)} onMouseEnter={onEnter} onMouseLeave={onLeave} />
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center justify-items-center content-center items-center">
                            <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center">
                                <input ref={groupNameRef} type="text" name="groupName" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Insert group name" />
                            </div>
                            <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center mt-5">
                                <input ref={groupDescription} type="text" name="groupDescription" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Insert group description" />
                            </div>
                            <div className="w-5/6 mt-3 flex flex-row justify-between justify-items-center content-center items-center align-center">
                                <div className='p-3 rounded-lg bg-gray-700' onClick={handleInputClick}>
                                    <label htmlFor="imageUrl">
                                        <input ref={inputFile} onChange={handleFileChange} type="file" name="imageUrl" style={{ "display": "none" }} />
                                        <BsImageFill />
                                    </label>
                                </div>
                                <div>
                                    <button type="submit" className='self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <br />
                </div>
            }

            {/* Loading groups */}
            {groups === null && <ClipLoader />}
            {/* We do this if user has no people following */}
            {((groups && groups.errorMessage === "User is following anyone.") || (groups && groups.length === 0)) &&
                (<div className='flex flex-col justify-center justify-items-center content-center items-center w-full h-full mt-12'>
                    <p>We cant find any group, go ahead and create the first one🚀🚀</p>
                    <button onClick={() => setNewGroupForm(true)} type="submit" className='mt-8 z-0 self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Create group</button>
                </div>)
            }
            {/* After loading groups */}
            {
                (groups !== null && !groups.errorMessage) && groups.map(elem => {
                    return (<Group data={elem} key={uuid()} />)
                })
            }
        </div >

    )
}
