import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { createNewCommentOfComment, getComment, manageCommentLikeService, removeCommentService } from '../services/comment.services';
import FormatTime from './FormatTime'
import { FaRegComment, FaTrash } from 'react-icons/fa'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { BsImageFill } from 'react-icons/bs'
import gsap from 'gsap';
import { uploadImage } from '../services/util.services';
import { AuthContext } from '../context/auth.context';
import uuid from 'react-uuid';
import LightBox from './LightBox';

export default function Comment(props) {

    //States
    const [commentInfo, setCommentInfo] = useState(props.comment);
    const [loading, setLoading] = useState(true);
    const [addCommentInput, setAddCommentInput] = useState(false);
    const [fileImage, setFileImage] = useState(null);
    const [likedPost, setLikedPost] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);
    const { user: loggedUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleAddCommentInputShow = (e) => setAddCommentInput(!addCommentInput)

    useEffect(() => {
        getCommentInfo();
    }, [])

    // Get the comment info initially
    const getCommentInfo = async () => {
        setLoading(true);
        try {
            const response = await getComment(props.comment._id);
            const orderData = orderMessagesByDate(response.data);
            setCommentInfo(orderData);
            checkIfPostLiked(response.data.likes);
        } catch (error) {
            navigate("/error");
        }
        setLoading(false);
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
    // Function to check if the post is liked by the user loggedIn
    const checkIfPostLiked = (response) => {
        if (response && response.includes(loggedUser.id)) {
            setLikedPost(true);
        }
    }

    // Refetch the post info when modified
    const reloadPostInfo = async () => {
        setLoading(true);
        try {
            const response = await getComment(commentInfo._id);
            const orderData = orderMessagesByDate(response.data);
            setCommentInfo(orderData);
            checkIfPostLiked(response.data.likes);
        } catch (error) {
            navigate("/error");
        }
        setLoading(false);
    }
    // Function to handle the Like Button
    const handleAddLike = async (e) => {
        e.preventDefault();
        setLikedPost(!likedPost);
        try {
            await manageCommentLikeService(commentInfo._id, loggedUser);
        } catch (error) {
            navigate("/error");
        }
        reloadPostInfo();
    }
    // Open lightbox
    const handleClickImageOpen = (e) => {
        e.preventDefault();
        setImageOpen(true);
    }

    // New comment submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const messageInputFromRef = messageInputRef.current.value;
            let data;
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
            await createNewCommentOfComment(commentInfo._id, data);
            messageInputRef.current.value = "";
            reloadPostInfo();
        } catch (error) {
            navigate("/error");
        }
    }

    const removeComment = async () => {
        try {
            await removeCommentService(commentInfo._id, loggedUser);
            reloadPostInfo();
            // gsap.to(commentRef.current, { opacity: "0", display: "none" });
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

    // Ref for inputs, so we dont re-render all the component
    const messageInputRef = useRef("");
    const commentRef = useRef();
    // Input File Functionality
    const inputFile = useRef(null);
    const handleFileChange = (e) => setFileImage(e.target.files[0])
    const handleInputClick = (e) => inputFile.current.click()

    const normalStyle = "flex flex-col items-center w-[99%] border border-gray-900 rounded-xl p-5";
    const removedStyle = "flex flex-col items-center w-[99%] border border-orange-900/[.35] rounded-xl p-5"

    if (loading === true) {
        return (<><ClipLoader color={"white"} /></>);
    }

    return (
        <div className='flex flex-col w-full flex-col justify-end justify-items-center content-center items-end mt-4' ref={commentRef}>
            <div className={commentInfo.deleted ? removedStyle : normalStyle}>
                <div className='flex flex-col w-[99%] min-w-[400px] align-center justify-items-center justify-items-center content-center items-center align-center rounded-xl p-3 pr-0'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <Link to={`/profile/${commentInfo.user.username}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={commentInfo.user.imageUrl ? commentInfo.user.imageUrl : "/defavatar.png"} width={36} alt="" srcSet="" className='rounded-full w-[36px] h-[36px] rounded-full object-cover' />
                            <p className='ml-3'>@{commentInfo.user.username}</p>
                        </Link>
                        <p className='justify-self-end'><FormatTime date={commentInfo.createdAt} /></p>
                    </div>
                    {commentInfo.imageUrl !== undefined &&
                        <>
                            <div className="flex flex-col justify-items-center content-center items-center align-center mt-5">
                                {!commentInfo.deleted &&
                                    <img src={commentInfo.imageUrl} width={600} alt="" onClick={handleClickImageOpen} className='justify-self-center self-center rounded-3xl' />
                                }
                            </div>
                            <LightBox imageUrl={commentInfo.imageUrl} setImageOpen={setImageOpen} imageOpen={imageOpen} />
                        </>
                    }
                    <div className="flex flex-row justify-between mt-5 w-full">
                        <p className='self-start'>{commentInfo.message}</p>
                        <div className='postIcons flex flex-row'>
                            {(loggedUser.id === commentInfo.user._id) && (commentInfo.deleted === false) && <FaTrash className='hover:text-red-600 mr-9' size={20} onClick={removeComment} />}
                            <FaRegComment className='text-white text-xl' onClick={handleAddCommentInputShow} onMouseEnter={onEnter} onMouseLeave={onLeave} />
                            <p className='ml-2'>{commentInfo.commentCount}</p>
                            {likedPost ? <BsHeartFill className='ml-9 text-red-600 text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} /> : <BsHeart className='ml-9 text-white text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} />}
                            <p className='ml-2'>{commentInfo.likeCount}</p>
                        </div>
                    </div>
                    <hr />
                    {addCommentInput &&
                        <div className="flex flex-col w-full">
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="w-full flex flex-row justify-center justify-items-center content-center items-center">
                                    <input ref={messageInputRef} type="text" name="newPost" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Add new comment" />
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

                    }
                    <div className="flex flex-col w-full">
                        {
                            commentInfo.comments.map((elem) => {
                                return (<><Comment comment={elem} key={uuid()} /></>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
