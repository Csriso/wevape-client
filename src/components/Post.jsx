import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import FormatTime from './FormatTime';
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { AuthContext } from '../context/auth.context'
import gsap from 'gsap';
import LightBox from './LightBox';
import { manageLikeService } from '../services/post.services';

export default function Post(props) {
  // Props
  const { _id, user, createdAt, imageUrl, message, likeCount } = props.data;
  const [imageOpen, setImageOpen] = useState(false);
  const [activeLinks, setActiveLinks] = useState(true);
  // Using an alias to prevent using same variable 'user'
  const { user: loggedUser } = useContext(AuthContext);

  // GSAP Animations
  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.3 });
  };
  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };

  const handleClickImageOpen = (e) => {
    e.preventDefault();
    setImageOpen(true);
  }

  const handleAddLike = async (e) => {
    e.preventDefault();
    console.log(_id, loggedUser);
    const response = await manageLikeService(_id, loggedUser);
    console.log(response);
    console.log("adding like");
  }


  return (
    <div className="flex flex-col items-center">
      <Link to={activeLinks ? `/post/${_id}` : "#"}>
        {/* We have image */}
        <div className='flex flex-col w-5/6 align-center justify-items-center w-[600px] justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
          <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
            <Link to={activeLinks ? `/profile/${user._id}` : "#"} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
              <img src={user.imageUrl ? user.imageUrl : "./defavatar.png"} width={36} alt="" srcset="" />
              <p className='ml-3'>@{user.username}</p>
            </Link>
            <p className='justify-self-end'><FormatTime date={createdAt} /></p>
          </div>
          {imageUrl !== undefined &&
            <>
              <div className="flex flex-col justify-items-center content-center items-center align-center mt-5">
                <img src={imageUrl} width={600} alt="" onClick={handleClickImageOpen} className='justify-self-center self-center rounded-3xl' />
              </div>
              <LightBox imageUrl={imageUrl} setImageOpen={setImageOpen} imageOpen={imageOpen} />
            </>
          }
          <div className="flex flex-row justify-between mt-5 w-full">
            <p className='self-start'>{message}</p>
            <div className='postIcons flex flex-row'>
              <FaRegComment className='text-white text-xl' onMouseEnter={onEnter} onMouseLeave={onLeave} />
              <FaRegHeart className='ml-9 text-white text-xl' onClick={handleAddLike} onMouseEnter={onEnter} onMouseLeave={onLeave} />
              <p className='ml-2'>{likeCount}</p>
              {/* {user._id !== loggedUser.id && <FaRegHeart className='ml-5 text-white text-xl' />} */}
            </div>
          </div>
          <br />
        </div>
      </Link>
    </div>
  )
}
