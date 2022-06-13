import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import uuid from 'react-uuid';
import FormatTime from '../components/FormatTime';
import Post from '../components/Post';
import { AuthContext } from '../context/auth.context';
import { UtilityContext } from '../context/utility.context';
import { getAllUserGroups } from '../services/groups.services';
import { getUsernamePostsService } from '../services/post.services';
import { avatarUpdate, followProfileService, getProfileService, profileUpdateService } from '../services/profile.services';
import { uploadImage } from '../services/util.services';

export default function Profile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const [myProfile, setMyProfile] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [userPosts, setUserPosts] = useState(null);
    const [followed, setFollowed] = useState(false);
    const [fileImage, setFileImage] = useState(null);
    const [submitingImage, setSubmitingImage] = useState(false);
    const [userGroups, setUserGroups] = useState(null);

    const { setProfilePic } = useContext(UtilityContext)

    const [editForm, setEditForm] = useState({ username: "", location: "", description: "", password: "", repeatPassword: "" });
    const { username } = useParams();
    const { user, completeUser, authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleFollow = async () => {
        try {
            await followProfileService(profileInfo.username, user);
        } catch (error) {
            navigate("/error");
        }
        getProfileInfo();
    }

    const getProfileInfo = async () => {
        try {
            let response;
            //MY PROFILE
            if (username === undefined) {
                response = await getProfileService(completeUser.username);
            } //ANOTHER PERSON PROFILE
            else {
                response = await getProfileService(username);
                checkIfUserFollowed(response.data._id);
            }
            setProfileInfo(response.data);
            if (response.data._id === user.id) {
                await setMyProfile(true);
            }
        } catch (error) {
            navigate("/error");
        }
    }
    const checkIfUserFollowed = async (userid) => {
        try {
            const response = await getProfileService(completeUser.username);
            if (response.data.following.includes(userid)) {
                setFollowed(true);
            } else {
                setFollowed(false);
            }
        } catch (error) {
            navigate("/error");
        }
    }
    const getUserPosts = async () => {
        try {
            let response;
            if (username === undefined) {
                response = await getUsernamePostsService(completeUser.username);
            } else {
                response = await getUsernamePostsService(username);
            }
            setUserPosts(response.data);
        } catch (error) {
            navigate("/error");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await profileUpdateService(profileInfo._id, editForm);
            authenticateUser();
            setProfileInfo(response.data)
        } catch (error) {
            navigate("/error");
        }
        getUserPosts();
        navigate("/");
    }
    const handleFormChange = (e) => {
        const formCopy = { ...editForm };
        formCopy[e.target.name] = e.target.value;
        setEditForm(formCopy);
    }

    const getUserGroups = async () => {
        try {
            const response = await getAllUserGroups(completeUser._id);
            setUserGroups(response.data.groups);
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        getProfileInfo();
        getUserPosts();
        getUserGroups();
    }, [])

    // Input File Functionality
    const inputFile = useRef(null);
    const handleFileChange = async (e) => { setFileImage(e.target.files[0]); handleSubmitAvatar(e) }
    const handleInputClick = (e) => inputFile.current.click()

    // New avatar
    const handleSubmitAvatar = async (e) => {
        try {
            if (e.target.files[0] !== null) {
                setSubmitingImage(true);
                const uploadData = new FormData();
                uploadData.append("imageUrl", e.target.files[0]);
                const imageUrl = await uploadImage(uploadData);
                await avatarUpdate(user.id, { imageUrl: imageUrl.data.fileUrl });
                await authenticateUser();
                await getProfileInfo();
                getUserPosts();
                setProfilePic(imageUrl.data.fileUrl);
                setSubmitingImage(false);
            }
        } catch (error) {
            navigate("/error");
        }
    }


    // Loading
    if (profileInfo === null || userPosts === null) {
        return (<><ClipLoader color={"white"} /></>);
    }
    return (
        <div className="w-4/6 flex flex-col items-center mt-5">
            <div className='flex flex-col w-5/6 align-center justify-items-center justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-start">
                        <div className="flex w-[200px] h-[200px] flex-row align-center justify-items-center justify-center content-center items-center align-center ml-9">
                            {!submitingImage ? <img onClick={handleInputClick} src={profileInfo.imageUrl ? profileInfo.imageUrl : "/defavatar.png"} alt="" width={200} height={200} className="rounded-full object-cover w-[200px] h-[200px]" /> : <ClipLoader color={"white"} size={70} />}
                            <input ref={inputFile} onChange={handleFileChange} type="file" name="imageUrl" style={{ "display": "none" }} />
                        </div>
                        <div className="mt-5 ml-8 flex flex-col items-start">
                            <h5 className='strong mb-2 font-bold'>@{profileInfo.username}</h5>
                            <p>Description: {profileInfo.description ? profileInfo.description : ""}</p>
                            <p>Location: {profileInfo.location ? profileInfo.location : ""}</p>
                            <p className='flex flex-row'><span className='mr-1'>Joined </span> <FormatTime date={profileInfo.createdAt} /></p>
                        </div>
                    </div>
                    <div className="">
                        {myProfile && <button type="button" onClick={() => setEditProfile(!editProfile)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Edit Profile</button>}
                        {(!myProfile && !followed) && <button type="button" onClick={handleFollow} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Follow</button>}
                        {(!myProfile && followed) && <button type="button" onClick={handleFollow} class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800">Stop following</button>}
                    </div>
                </div>
                {editProfile &&
                    <div className="flex flex-col w-full flex flex-col justify-center justify-items-center content-center items-center mb-9">
                        <p>Edit Profile</p>
                        <form className="w-3/6 flex flex-col justify-center justify-items-center content-center items-center" onSubmit={handleSubmit}>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input onChange={handleFormChange} type="text" name="username" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Username" />
                            </div>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input onChange={handleFormChange} type="text" name="location" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Location" />
                            </div>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input onChange={handleFormChange} type="text" name="description" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Description" />
                            </div>
                            {/* <p className='mt-4'>Password:</p>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input onChange={handleFormChange} type="password" name="password" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Password" />
                            </div>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input onChange={handleFormChange} type="password" name="repeatPassword" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Repeat Password" />
                            </div>
                            <div className="w-full mt-3 flex flex-row justify-center justify-items-center content-center items-center align-center">
                                <button type="submit" className='self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Submit</button>
                            </div> */}
                        </form>
                    </div>
                }
                <div className="flex flex-col w-full mb-12">
                    <p className='text-bold text-2xl'>@{profileInfo.username} groups</p>
                    <div className="flex flex-row justify-center pt-8">
                        {userGroups === null && <ClipLoader color={"white"} />}
                        {userGroups && userGroups !== null && <>
                            {userGroups.map((elem) => {
                                return (<div className='flex flex-col justify-start align-items-center items-center content-center flex-wrap w-[130px]'>
                                    <img src={elem.imageUrl ? elem.imageUrl : "/group.jpg"} alt="" className='w-[96px] h-[96px] rounded-full object-cover' />
                                    <p className='mt-3 text-xl'>{elem.name}</p>
                                </div>)
                            })}
                        </>}
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <p className='text-bold text-2xl'>User Posts</p>
                    <div className='flex flex-col align-center justify-items-center justify-items-center content-center items-center align-center'>
                        {userPosts === null && <ClipLoader color={"white"} />}
                        {userPosts && userPosts !== null && userPosts.length === 0 &&
                            <div className='flex flex-col w-full align-center justify-items-center justify-items-center content-center items-center align-center mb-5'>
                                <h4 className='mt-5'>No posts found</h4>
                            </div>
                        }
                        {userPosts !== null &&
                            <div className='flex flex-col w-full align-center justify-items-center justify-items-center content-center items-center align-center'>
                                {userPosts.map(elem => {
                                    return (
                                        <div className="w-full">
                                            <Post data={elem} key={uuid()} />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}
