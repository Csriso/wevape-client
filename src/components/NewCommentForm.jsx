import React from 'react'
import { BsImageFill } from 'react-icons/bs'

export default function NewCommentForm(props) {
    const { handleSubmit, newMessage, handleNewMessageChange, handleInputClick, inputFile, handleFileChange } = props;

    return (
        <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full flex flex-row justify-center justify-items-center content-center items-center">
                    <input value={newMessage} onChange={handleNewMessageChange} type="text" name="newPost" className="w-full py-2 pl-5 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Add new comment" />
                </div>
                <div className="w-full mt-3 flex flex-row justify-between justify-items-center content-center items-center align-center">
                    <div className='p-3 rounded-lg bg-gray-700' onClick={handleInputClick}>
                        <label htmlFor="imageUrl">
                            <input ref={inputFile} onChange={handleFileChange} type="file" name="imageUrl" style={{ "display": "none" }} />
                            <BsImageFill />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className='self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}