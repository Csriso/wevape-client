import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import FormatTime from '../components/FormatTime';
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { AuthContext } from '../context/auth.context'
import gsap from 'gsap';
import { BsImageFill } from 'react-icons/bs'
import LightBox from '../components/LightBox';
import { getPostService, manageLikeService } from '../services/post.services';
import { uploadImage } from '../services/util.services';
import { createNewComment } from '../services/comment.services';
import Comment from '../components/Comment'
import { ClipLoader } from 'react-spinners';
import uuid from 'react-uuid';

export default function Post() {
    // Params for postID
    const { id } = useParams();
    // States
    const [imageOpen, setImageOpen] = useState(false);
    const [likedPost, setLikedPost] = useState(false);
    const [postInfo, setPostInfo] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [fileImage, setFileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    // Using an alias to prevent using same variable 'user'
    const { user: loggedUser } = useContext(AuthContext);
    // Handle for the Comment form
    const handleNewMessageChange = (e) => setNewMessage(e.target.value)

    useEffect(() => {
        retrievePostInfo();
    }, [])

    // Get the info from the postID of params
    const retrievePostInfo = async () => {
        console.log("RetrievePostInfo");
        try {
            setLoading(true);
            const response = await getPostService(id);
            const orderData = orderMessagesByDate(response.data);
            setPostInfo(orderData);
            checkIfPostLiked(response.data.likes);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Function to reverse the order, so comments get on ascending order by time posted.
    const orderMessagesByDate = (data) => {
        let commentsReversed = data.comments.reverse();
        const returnData = {
            ...data,
            comments: commentsReversed,
        }
        return returnData;
    }

    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };

    // Function to check if the post is liked by the user loggedIn
    const checkIfPostLiked = (response) => {
        if (response && response.includes(loggedUser.id)) {
            setLikedPost(true);
        }
    }


    // Refetch the post info when modified
    const reloadPostInfo = async () => {
        console.log("RELOADPOSTINFO");
        const response = await getPostService(postInfo._id);
        const orderData = orderMessagesByDate(response.data);
        setPostInfo(orderData);
    }

    // LightBox open function
    const handleClickImageOpen = (e) => {
        e.preventDefault();
        setImageOpen(true);
    }


    // Function to handle the Like Button
    const handleAddLike = async (e) => {
        e.preventDefault();
        console.log("HANDLELIKE");
        setLikedPost(!likedPost);
        await manageLikeService(postInfo._id, loggedUser);
        reloadPostInfo();
    }

    // New comment submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            const messageInputFromRef = messageInputRef.current.value;
            if (fileImage !== null) {
                const uploadData = new FormData();
                uploadData.append("imageUrl", fileImage);
                const imageUrl = await uploadImage(uploadData);
                data = {
                    user: loggedUser.id,
                    newMessage: messageInputFromRef,
                    imageUrl: imageUrl.data.fileUrl
                }
            } else {
                data = {
                    user: loggedUser.id,
                    newMessage: messageInputFromRef,
                }
            }
            await createNewComment(id, data);
            reloadPostInfo();
        } catch (error) {
            console.log(error);
        }
    }

    // Input File Functionality
    const messageInputRef = useRef("");
    const inputFile = useRef(null);
    const handleFileChange = (e) => { setFileImage(e.target.files[0]); }
    const handleInputClick = (e) => { inputFile.current.click() }

    // Loading
    if (loading === true) {
        return (<><ClipLoader color={"white"} /></>);
    }

    return (
        <div className="w-4/6 flex flex-col mt-6">
            <div className="flex flex-col items-center">
                <div className='flex flex-col w-5/6 align-center justify-items-center justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <Link to={`/profile/${postInfo.user.username}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={postInfo.user.imageUrl ? postInfo.user.imageUrl : "/defavatar.png"} width={36} alt="" srcSet="" />
                            <p className='ml-3'>@{postInfo.user.username}</p>
                        </Link>
                        <p className='justify-self-end'><FormatTime date={postInfo.createdAt} /></p>
                    </div>
                    {postInfo.imageUrl !== undefined &&
                        <>
                            <div className="flex flex-col justify-items-center content-center items-center align-center mt-5">
                                <img src={postInfo.imageUrl} width={600} alt="" onClick={handleClickImageOpen} className='justify-self-center self-center rounded-3xl' />
                            </div>
                            <LightBox imageUrl={postInfo.imageUrl} setImageOpen={setImageOpen} imageOpen={imageOpen} />
                        </>
                    }
                    <div className="flex flex-row justify-between mt-5 w-full">
                        <p className='self-start'>{postInfo.message}</p>
                        <div className='postIcons flex flex-row'>
                            <FaRegComment className='text-white text-xl' onMouseEnter={onEnter} onMouseLeave={onLeave} />
                            <p className='ml-2'>{postInfo.commentCount}</p>
                            {likedPost ? <BsHeartFill className='ml-9 text-red-600 text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} /> : <BsHeart className='ml-9 text-white text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} />}
                            <p className='ml-2'>{postInfo.likeCount}</p>
                            {/* {user._id !== loggedUser.id && <FaRegHeart className='ml-5 text-white text-xl' />} */}
                        </div>
                    </div>
                    <hr />
                    <div className="mt-5 flex w-full flex-col justify-center justify-items-center content-center items-center">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="w-full flex flex-row justify-center justify-items-center content-center items-center">
                                <input ref={messageInputRef} type="text" name="newPost" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Add new comment" />
                            </div>
                            <div className="w-full mt-3 flex flex-row justify-between justify-items-center content-center items-center align-center">
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
                        </form>
                    </div>
                    <hr />
                    <div className="flex flex-col w-full">
                        {
                            postInfo.comments.map((elem) => {
                                return (<><Comment comment={elem} key={uuid()} /></>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
