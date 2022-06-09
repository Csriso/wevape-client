import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormatTime from './FormatTime';
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { AuthContext } from '../context/auth.context'
import gsap from 'gsap';
import LightBox from './LightBox';
import { getPostService, manageLikeService } from '../services/post.services';
import uuid from 'react-uuid'

export default function Ad(props) {
    // States
    const [imageOpen, setImageOpen] = useState(false);
    const [likedPost, setLikedPost] = useState(false);
    const [myPost, setMyPost] = useState(false);
    const [postInfo, setPostInfo] = useState(props.data);
    // Using an alias to prevent using same variable 'user'
    const { user: loggedUser } = useContext(AuthContext);

    useEffect(() => {
        checkIfMyPost();
        checkIfPostLiked();
    }, [])


    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };

    // Function to check if the post is liked by the user loggedIn
    const checkIfPostLiked = () => {
        if (postInfo.likes.includes(loggedUser.id)) {
            setLikedPost(true);
        }
    }
    // Check if the post is mine
    const checkIfMyPost = () => {
        if (postInfo.user._id === loggedUser.id) {
            setMyPost(true);
        }
    }
    // Refetch the post info when modified
    const reloadPostInfo = async () => {
        const response = await getPostService(postInfo._id);
        setPostInfo(response.data);
    }

    // LightBox open function
    const handleClickImageOpen = (e) => {
        e.preventDefault();
        setImageOpen(true);
    }

    // Function to handle the Like Button
    const handleAddLike = async (e) => {
        e.preventDefault();
        setLikedPost(!likedPost);
        await manageLikeService(postInfo._id, loggedUser);
        await reloadPostInfo();
    }


    return (
        <div className="flex flex-col items-center w-full">
            <Link to={`/post/${postInfo._id}`} key={uuid()} className={"flex flex-col w-10/12 align-center justify-items-center w-full justify-items-center content-center items-center align-center"}>
                {/* We have image */}
                <div className='flex flex-col w-full align-center justify-items-center w-full justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <Link to={`/profile/${postInfo.user.username}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={postInfo.user.imageUrl ? postInfo.user.imageUrl : "./defavatar.png"} width={36} alt="" srcSet="" className='rounded-full w-[36px] h-[36px] rounded-full object-cover' />
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
                    <br />
                </div>
            </Link>
        </div>
    )
}
