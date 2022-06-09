import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormatTime from './FormatTime';
import { FaRegComment } from 'react-icons/fa'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { AuthContext } from '../context/auth.context'
import gsap from 'gsap';
import LightBox from './LightBox';
import uuid from 'react-uuid'
import { getOneAdsService, manageLikeAdService } from '../services/marketplace.services';
import { ClipLoader } from 'react-spinners';

export default function Ad(props) {
    // States
    const [imageOpen, setImageOpen] = useState(false);
    const [likedAd, setLikedAd] = useState(false);
    const [myAd, setMyAd] = useState(false);
    const [adInfo, setAdInfo] = useState(props.data);
    // Using an alias to prevent using same variable 'user'
    const { user: loggedUser } = useContext(AuthContext);

    useEffect(() => {
        checkIfMyAd();
        checkIfAdLiked();
    }, [])


    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };

    // Function to check if the post is liked by the user loggedIn
    const checkIfAdLiked = () => {
        if (adInfo.likes.includes(loggedUser.id)) {
            setLikedAd(true);
        }
    }
    // Check if the post is mine
    const checkIfMyAd = () => {
        if (adInfo.user._id === loggedUser.id) {
            setMyAd(true);
        }
    }
    // Refetch the ad info when modified
    const reloadAdInfo = async () => {
        const response = await getOneAdsService(adInfo._id);
        setAdInfo(response.data);
    }

    // LightBox open function
    const handleClickImageOpen = (e) => {
        e.preventDefault();
        setImageOpen(true);
    }

    // Function to handle the Like Button
    const handleAddLike = async (e) => {
        e.preventDefault();
        setLikedAd(!likedAd);
        await manageLikeAdService(adInfo._id, loggedUser);
        reloadAdInfo();
    }
    // LOADING
    if (adInfo.user === undefined) {
        return (<><ClipLoader color={"white"} /></>);
    }
    return (
        <div className="flex flex-col items-center w-full">
            <Link to={`/marketplace/${adInfo._id}`} key={uuid()} className={"flex flex-col w-10/12 align-center justify-items-center w-full justify-items-center content-center items-center align-center"}>
                {/* We have image */}
                <div className='flex flex-col w-full align-center justify-items-center w-full justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <Link to={`/profile/${adInfo.user.username}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={adInfo.user.imageUrl ? adInfo.user.imageUrl : "./defavatar.png"} width={36} alt="" srcSet="" className='rounded-full w-[36px] h-[36px] rounded-full object-cover' />
                            <p className='ml-3'>@{adInfo.user.username}</p>
                        </Link>
                        <p className='justify-self-end'><FormatTime date={adInfo.createdAt} /></p>
                    </div>
                    {adInfo.imageUrl !== undefined &&
                        <>
                            <div className="flex flex-col justify-items-center content-center items-center align-center mt-5">
                                <img src={adInfo.imageUrl} width={600} alt="" onClick={handleClickImageOpen} className='justify-self-center self-center rounded-3xl' />
                            </div>
                            <LightBox imageUrl={adInfo.imageUrl} setImageOpen={setImageOpen} imageOpen={imageOpen} />
                        </>
                    }
                    <div className="flex flex-row justify-between mt-5 w-full">
                        <p className='self-start'>{adInfo.product}</p>
                    </div>
                    <div className="flex flex-row justify-between mt-5 w-full">
                        <p className='self-start'>{adInfo.message} - Precio: {adInfo.price}€</p>
                        <div className='postIcons flex flex-row'>
                            <FaRegComment className='text-white text-xl' onMouseEnter={onEnter} onMouseLeave={onLeave} />
                            <p className='ml-2'>{adInfo.commentCount}</p>

                            {likedAd ? <BsHeartFill className='ml-9 text-red-600 text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} /> : <BsHeart className='ml-9 text-white text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} />}
                            <p className='ml-2'>{adInfo.likeCount}</p>
                            {/* {user._id !== loggedUser.id && <FaRegHeart className='ml-5 text-white text-xl' />} */}
                        </div>
                    </div>
                    <br />
                </div>
            </Link>
        </div>
    )
}
