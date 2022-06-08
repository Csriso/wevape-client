import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import uuid from 'react-uuid';
import FormatTime from '../components/FormatTime';
import Post from '../components/Post';
import { AuthContext } from '../context/auth.context';
import { getUsernamePostsService } from '../services/post.services';
import { followProfileService, getProfileService } from '../services/profile.services';

export default function Profile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const [myProfile, setMyProfile] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [userPosts, setUserPosts] = useState(null);
    const [followed, setFollowed] = useState(false);

    const [editForm, setEditForm] = useState({ username: "", location: "", description: "", password: "", repeatPassword: "" });
    const { username } = useParams();
    const { user } = useContext(AuthContext)

    const handleFollow = async () => {
        try {
            const response = await followProfileService(profileInfo.username, user);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        getProfileInfo();
    }

    const getProfileInfo = async () => {
        try {
            let response;
            console.log("USERRRRRRRRRRRRRRRRRRRRRRR", user.username, username);
            //MY PROFILE
            if (username === undefined) {
                response = await getProfileService(user.username);
            } //ANOTHER PERSON PROFILE
            else {
                response = await getProfileService(username);
                checkIfUserFollowed(response.data._id);
            }
            setProfileInfo(response.data);
            if (response.data._id === user.id) {
                await setMyProfile(true);
            }
            console.log(myProfile, "USER LOGGED", user.id, "USER REQUEST", response.data._id);
        } catch (error) {
            console.error(error);
        }
    }
    const checkIfUserFollowed = async (userid) => {
        const response = await getProfileService(user.username);
        console.log(userid);
        console.log(response.data.following);
        if (response.data.following.includes(userid)) {
            setFollowed(true);
        } else {
            setFollowed(false);
        }
    }
    const getUserPosts = async () => {
        try {
            let response;
            if (username === undefined) {
                response = await getUsernamePostsService(user.username);
            } else {
                response = await getUsernamePostsService(username);
            }
            setUserPosts(response.data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfileInfo();
        getUserPosts();
    }, [])

    // Loading
    if (profileInfo === null) {
        return (<><ClipLoader color={"white"} /></>);
    }
    return (
        <div className="w-4/6 flex flex-col items-center mt-5">
            <div className='flex flex-col w-5/6 align-center justify-items-center justify-items-center content-center items-center align-center  border border-gray-700 p-7'>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-start">
                        <img src={profileInfo.imgUrl ? profileInfo.imgUrl : "/defavatar.png"} alt="" width={200} />
                        <div className="mt-5 ml-8 flex flex-col items-start">
                            <h5 className='strong mb-2 font-bold'>@{profileInfo.username}</h5>
                            <p>Description: {profileInfo.description ? profileInfo.description : ""}</p>
                            <p className='flex flex-row'><span className='mr-1'>Joined </span> <FormatTime date={profileInfo.createdAt} /></p>
                        </div>
                    </div>
                    <div className="">
                        {myProfile && <button type="button" onClick={() => setEditProfile(!editProfile)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Profile</button>}
                        {(!myProfile && !followed) && <button type="button" onClick={handleFollow} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>}
                        {(!myProfile && followed) && <button type="button" onClick={handleFollow} class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Stop following</button>}
                    </div>
                </div>
                {editProfile &&
                    <div className="flex flex-col w-full">
                        <p>Edit Profile</p>
                        <form className="w-full">
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input type="text" name="username" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Username" />
                            </div>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input type="text" name="location" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Location" />
                            </div>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input type="text" name="description" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Description" />
                            </div>
                            <p>Password:</p>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input type="text" name="password" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Password" />
                            </div>
                            <div className="mt-2 w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input type="text" name="repeatPassword" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Repeat Password" />
                            </div>
                            <div className="w-full mt-3 flex flex-row justify-between justify-items-center content-center items-center align-center">
                                <div>
                                    <button type="submit" className='self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                <div className="flex flex-col w-full">
                    <p className='text-bold text-2xl'>User Posts</p>
                    <div className='flex flex-col align-center justify-items-center justify-items-center content-center items-center align-center'>
                        {userPosts === null && <ClipLoader color={"white"} />}
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
                        {userPosts && userPosts.length === 0 &&
                            <div className='flex flex-col w-full align-center justify-items-center justify-items-center content-center items-center align-center mb-5'>
                                <h4 className='mt-5'>No posts found</h4>
                            </div>
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}
