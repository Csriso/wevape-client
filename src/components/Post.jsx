import React from 'react'
import { Link } from 'react-router-dom';
import FormatTime from './FormatTime';
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
export default function Post(props) {
  const elem = props.data;
  return (
    <div className="flex flex-col items-center">
      <Link to={`/post/${elem._id}`}>
        {/* We have image */}
        {console.log(elem)}
        <div className='flex flex-col w-5/6 align-center justify-items-center w-[600px] justify-items-center content-center items-center align-center  border border-gray-700 p-7'>
          <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
            <Link to={`/profile/${elem.user._id}`} className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
              <img src={elem.user.imageUrl ? elem.user.imageUrl : "./defavatar.png"} width={36} alt="" srcset="" />
              <p className='ml-3'>@{elem.user.username}</p>
            </Link>
            <p className='justify-self-end'><FormatTime date={elem.createdAt} /></p>
          </div>
          {elem.imageUrl !== undefined &&
            <div className="flex flex-col justify-items-center content-center items-center align-center mt-5">
              <img src={elem.imageUrl} width={600} alt="" className='justify-self-center self-center rounded-3xl' />
            </div>
          }
          <div className="flex flex-row justify-between mt-5 w-full">
            <p className='self-start'>{elem.message}</p>
            <div className='postIcons flex flex-row'>
              <FaRegComment className='text-white text-xl' />
              <FaRegHeart className='ml-5 text-white text-xl' />
            </div>
          </div>
          <br />
        </div>
      </Link>
    </div>
  )
}
