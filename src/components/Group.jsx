import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormatTime from './FormatTime';
import { AuthContext } from '../context/auth.context'
import gsap from 'gsap';
import LightBox from './LightBox';
import uuid from 'react-uuid'
import { getGroupService, joinGroupService } from '../services/groups.services';

export default function Group(props) {
    // States
    const [imageOpen, setImageOpen] = useState(false);
    const [groupInfo, setGroupInfo] = useState(props.data);
    const [imJoined, setImJoined] = useState(false);
    // Using an alias to prevent using same variable 'user'
    const { user: loggedUser, completeUser } = useContext(AuthContext);

    useEffect(() => {
        reloadGroup();
        checkIfImJoined();
    }, [])

    const checkIfImJoined = () => {
        console.log("CHECK IF IM JOIN", completeUser.groups.includes(groupInfo._id));
        if (completeUser.groups.includes(groupInfo._id)) {
            setImJoined(true);
        }
    }
    // GSAP Animations
    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.3 });
    };
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1 });
    };

    const joinGroup = async () => {
        try {
            await joinGroupService(groupInfo._id, completeUser);
            setImJoined(!imJoined);
        } catch (error) {
            console.log(error);
        }
    }

    const reloadGroup = async () => {
        try {
            const response = await getGroupService(groupInfo._id);
            setGroupInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div key={uuid()} className={"mt-5 flex flex-col w-10/12 align-center justify-items-center w-full justify-items-center content-center items-center align-center"}>
                {/* We have image */}
                <div className='flex flex-col w-full align-center justify-items-center w-full justify-items-center content-center items-center align-center rounded-xl border border-gray-700 p-7'>
                    <div className="flex flex-row self-start justify-between justify-items-center content-center items-center align-center w-full">
                        <div className="flex flex-row justify-start justify-items-center content-center items-center align-center m-0">
                            <img src={groupInfo.imageUrl ? groupInfo.imageUrl : "./group.jpg"} width={96} alt="" srcSet="" className='rounded-full w-[128px] h-[128px] rounded-full object-cover' />
                            <div className="flex flex-col items-start mt-2">
                                <p className='ml-5'><span className='font-bold'>Group name: </span>{groupInfo.name}</p>
                                <p className='ml-5'><span className='font-bold'>Description: </span>{groupInfo.description}</p>
                                {!imJoined ? <button onClick={joinGroup} type="button" class="justify-self-center ml-9 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Join group</button> :
                                    <button onClick={joinGroup} type="button" class="focus:outline-none ml-9 mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Leave group</button>}
                            </div>
                        </div>
                        <p className='justify-self-end'>Created: <FormatTime date={groupInfo.createdAt} /></p>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}
