import React from 'react'

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
        setImageOpen(false);
    }
    return (
        <div className='bg-black opacity-100 z-30 w-screen h-screen fixed top-0 left-0 right-0 left-0 cursor-pointer' style={imageOpen ? openStyles : closeStyles} onClick={closeLightBox}>
            <div className="flex flex-row justify-center h-full w-full align-items-center content-center opacity-100">
                <img src={imageUrl} alt="" className='opacity-100 self-center place-self-center object-cover' />
            </div>
        </div>
    )
}
