import React from 'react'
import { Link } from 'react-router-dom';

export default function Post(props) {
  const elem = props.data;
  return (
    <div className="flex flex-col items-center">
      {/* We have image */}
      {elem.imageUrl !== undefined &&
        <div className='flex flex-col w-5/6 align-center justify-items-center'>
          <Link to={`/profile/${elem.user._id}`} className="flex flex-row justify-start">
            <img src={elem.user.imageUrl ? elem.user.imageUrl : "./defavatar.png"} width={36} alt="" srcset="" />
            <p>@{elem.user.username}</p>
          </Link>
          <div className="flex flex-row">
            <img src={elem.imageUrl} width={800} alt="" />
          </div>
          <p>{elem.message}</p>
          <br />
        </div>}
      {/* We dont have image */}
      {elem.imageUrl === undefined &&
        <div className='flex flex-col w-5/6'>
          <div className="flex flex-row">
          </div>
          <p>{elem.message}</p>
          <br />
        </div>
      }

    </div>
  )
}
