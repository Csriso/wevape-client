import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { getComment } from '../services/comment.services';
import FormatTime from './FormatTime'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import gsap from 'gsap';

export default function Comment(props) {
    const [commentInfo, setCommentInfo] = useState(props.comment);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        lazyLoad();
    }, [])

    const lazyLoad = async () => {
        setLoading(true);
        const response = await getComment(props.comment._id);
        console.log(response.data);
        setCommentInfo(response.data);
        setLoading(false);
    }

    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };

    if (loading === true) {
        return (<><ClipLoader color={"white"} /></>);
    }

    return (
        <div className='flex flex-col w-full flex-col justify-end justify-items-center content-center items-end mt-4'>
            <div className="flex flex-col items-center w-[99%]">
                <div className='flex flex-col w-[99%] align-center justify-items-center justify-items-center content-center items-center align-center rounded-xl p-3 pr-0'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <Link to={`/profile/${commentInfo.user.username}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={commentInfo.user.imageUrl ? commentInfo.user.imageUrl : "/defavatar.png"} width={36} alt="" srcSet="" />
                            <p className='ml-3'>@{commentInfo.user.username}</p>
                        </Link>
                        <p className='justify-self-end'><FormatTime date={commentInfo.createdAt} /></p>
                    </div>
                    {commentInfo.imageUrl !== undefined &&
                        <>
                            <div className="flex flex-col justify-items-center content-center items-center align-center mt-5">
                                <img src={commentInfo.imageUrl} width={600} alt="" className='justify-self-center self-center rounded-3xl' />
                            </div>
                            {/* <LightBox imageUrl={commentInfo.imageUrl} setImageOpen={setImageOpen} imageOpen={imageOpen} /> */}
                        </>
                    }
                    <div className="flex flex-row justify-between mt-5 w-full">
                        <p className='self-start'>{commentInfo.message}</p>
                        <div className='postIcons flex flex-row'>
                            <FaRegComment className='text-white text-xl' onMouseEnter={onEnter} onMouseLeave={onLeave} />
                            {/* {likedPost ? <BsHeartFill className='ml-9 text-red-600 text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} /> : <BsHeart className='ml-9 text-white text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} />} */}

                            <p className='ml-2'>{commentInfo.likeCount}</p>
                            {/* {user._id !== loggedUser.id && <FaRegHeart className='ml-5 text-white text-xl' />} */}
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col w-full">
                        {
                            commentInfo.comments.map((elem) => {
                                return (<><Comment comment={elem} /></>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
