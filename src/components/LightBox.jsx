import React from 'react'
import { ImCross } from 'react-icons/im'

export default function LightBox(props) {
    const { imageUrl, setImageOpen, imageOpen } = props;

    const openStyles = {
        display: "block",
        position: "absolute",
    }

    const closeStyles = {
        display: "none",
    }
    console.log(props);
    const closeLightBox = () => {
        console.log("CLICK ON THE CLOSE")
        setImageOpen(false);
    }
    return (
        <div className='bg-black w-screen z-30 h-screen fixed top-0 left-0 right-0 left-0 cursor-pointer' style={imageOpen ? openStyles : closeStyles} onClick={closeLightBox}>
            <ImCross onClick={closeLightBox} />
            <img src={imageUrl} alt="" />
        </div>
    )
}
