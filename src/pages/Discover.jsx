import React, { useContext, useEffect, useRef, useState } from 'react'
import { UtilityContext } from '../context/utility.context.js'
import { newPostService, getAllPostsService } from '../services/post.services'
import { AuthContext } from '../context/auth.context'
import { ClipLoader } from 'react-spinners';
import { BsImageFill } from 'react-icons/bs'
import { uploadImage } from '../services/util.services'
import Post from './Post.jsx';
import uuid from 'react-uuid';

export default function Feed(props) {

    // Props
    const { look } = props;
    // States
    const [newMessage, setNewMessage] = useState(null);
    const [posts, setPosts] = useState(null);
    const [fileImage, setFileImage] = useState(null);

    //Contexts
    const { newStoryForm, setNewStoryForm } = useContext(UtilityContext)
    const { user } = useContext(AuthContext)

    //Handlers
    const handleNewMessageChange = (e) => setNewMessage(e.target.value)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (fileImage !== null) {
                const uploadData = new FormData();
                uploadData.append("imageUrl", fileImage);
                const imageUrl = await uploadImage(uploadData);
                data = {
                    user,
                    newMessage,
                    imageUrl: imageUrl.data.fileUrl
                }
            } else {
                data = {
                    user,
                    newMessage
                }
            }
            await newPostService(data);
            await getPosts();
            setNewStoryForm(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e) => { setFileImage(e.target.files[0]); }
    const handleInputClick = (e) => { inputFile.current.click() }

    //UseEffects
    useEffect(() => {
        getPosts();
    }, [])

    // Get Posts
    const getPosts = async () => {
        try {
            let response;
            if (look && look === "discover") {
                console.log("discover");
                response = await getAllPostsService();
            } else {
                console.log("myfeed");
                response = await getAllPostsService();
            }
            setPosts(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // REFs
    const inputFile = useRef(null);

    return (
        <div className="w-4/6 flex flex-col">
            {/* Add story form */}
            {newStoryForm &&
                <div style={{ width: "inherit" }} className='fixed top-0 w-auto bg-black pt-5 mb-5 flex flex-col justify-center justify-items-center content-center px-5 border-b border-gray-600'>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center justify-items-center content-center items-center">
                            <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center">
                                <input value={newMessage} onChange={handleNewMessageChange} type="text" name="newPost" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Add new story" />
                            </div>
                            <div className="w-5/6 mt-3 flex flex-row justify-between justify-items-center content-center items-center align-center">
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
                        </div>
                    </form>
                    <br />
                </div>
            }
            {/* Loading posts */}
            {posts === null && <ClipLoader />}
            {/* After loading posts */}
            {
                posts !== null && posts.map(elem => {
                    return (<Post data={elem} key={uuid()} />)
                })
            }
        </div >

    )
}
