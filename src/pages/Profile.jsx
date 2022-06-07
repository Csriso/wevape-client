import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../context/auth.context';
import { getProfileService } from '../services/profile.services';

export default function Profile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const [myProfile, setMyProfile] = useState(false);
    const { username } = useParams();
    const { user } = useContext(AuthContext)
    const getProfileInfo = async () => {
        try {
            let response;
            console.log("USERRRRRRRRRRRRRRRRRRRRRRR", user.username, username);
            if (username === undefined) {
                response = await getProfileService(user.username);
            } else {
                response = await getProfileService(username);
            }
            await setProfileInfo(response.data);
            if (response.data._id === user.id) {
                await setMyProfile(true);
            }
            console.log(myProfile, "USER LOGGED", user.id, "USER REQUEST", response.data._id);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProfileInfo();
    }, [])

    // Loading
    if (profileInfo === null) {
        return (<><ClipLoader color={"white"} /></>);
    }
    return (
        <div className="w-4/6 flex flex-col items-center">
            <div className='flex flex-col w-5/6 align-center justify-items-center w-[600px] justify-items-center content-center items-center align-center  border border-gray-700 p-7'>
                <h3>My profile</h3>
            </div>
        </div>
    )
}
