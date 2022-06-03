import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import FormatTime from './FormatTime';
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { AuthContext } from '../context/auth.context'
import gsap from 'gsap';
import Lightbox from 'react-image-lightbox';

export default function Post(props) {
    const { id } = useParams();
    // Props
    const { _id, user, createdAt, imageUrl, message } = props.data;
    const { imageOpen, setImageOpen } = useState(false);
    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };


    // Using an alias to prevent using same variable 'user'
    const { user: loggedUser } = useContext(AuthContext);
    return (
        <div className="flex flex-col items-center">
            <Link to={`/post/${_id}`}>
                {/* We have image */}
                <div className='flex flex-col w-5/6 align-center justify-items-center w-[600px] justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <Link to={`/profile/${user._id}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={user.imageUrl ? user.imageUrl : "./defavatar.png"} width={36} alt="" srcset="" />
                            <p className='ml-3'>@{user.username}</p>
                        </Link>
                        <p className='justify-self-end'><FormatTime date={createdAt} /></p>
                    </div>
                    {imageUrl !== undefined &&
                        <div onClick={() => setImageOpen(true)} className="flex flex-col justify-items-center content-center items-center align-center mt-5">
                            <img src={imageUrl} width={600} alt="" onClick={() => setImageOpen(true)} className='justify-self-center self-center rounded-3xl' />
                        </div>
                    }
                    <div className="flex flex-row justify-between mt-5 w-full">
                        <p className='self-start'>{message}</p>
                        <div className='postIcons flex flex-row'>
                            <FaRegComment className='text-white text-xl' onMouseEnter={onEnter} onMouseLeave={onLeave} />
                            <FaRegHeart className='ml-5 text-white text-xl' onMouseEnter={onEnter} onMouseLeave={onLeave} />
                            {/* {user._id !== loggedUser.id && <FaRegHeart className='ml-5 text-white text-xl' />} */}
                        </div>
                    </div>
                    <br />
                </div>
            </Link>
            {imageOpen && (
                <Lightbox
                    mainSrc={imageUrl}
                    onCloseRequest={() => setImageOpen(false)}
                />
            )}
        </div>
    )
}
