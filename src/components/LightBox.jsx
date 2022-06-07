import React from 'react'
import { ImCross } from 'react-icons/im'

export default function LightBox(props) {
    const { imageUrl, setImageOpen, imageOpen } = props;

    const openStyles = {
        display: "block",
        position: "fixed",
    }

    const closeStyles = {
        display: "none",
    }
    const closeLightBox = (e) => {
        e.preventDefault();
        console.log("CLICK ON THE CLOSE")
        setImageOpen(false);
    }
    return (
        <div className='bg-black opacity-100 z-30 w-screen h-screen fixed top-0 left-0 right-0 left-0 cursor-pointer' style={imageOpen ? openStyles : closeStyles} onClick={closeLightBox}>
            <ImCross onClick={closeLightBox} className="opacity-100 mt-5 ml-5" />
            <div className="flex flex-row justify-center align-items-center content-center opacity-100">
                <img src={imageUrl} alt="" className='w-4/6 opacity-100' />
            </div>
        </div>
    )
}
