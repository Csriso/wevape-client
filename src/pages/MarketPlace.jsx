import React, { useContext, useEffect, useRef, useState } from 'react'
import { UtilityContext } from '../context/utility.context.js'
import { AuthContext } from '../context/auth.context'
import { ClipLoader } from 'react-spinners';
import { BsImageFill } from 'react-icons/bs'
import { uploadImage } from '../services/util.services'
import { ImCross } from 'react-icons/im'
import uuid from 'react-uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewAdService, getAdsService } from '../services/marketplace.services.js';
import gsap from 'gsap';
import Ad from '../components/Ad.jsx';
export default function Feed(props) {

  // States
  const [ads, setAds] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [newAdForm, setNewAdForm] = useState(false);
  //Contexts
  const { user } = useContext(AuthContext)
  //Handlers

  // Form submit
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
          product: productRef.current.value,
          message: descriptionRef.current.value,
          imageUrl: imageUrl.data.fileUrl,
          price: priceRef.current.value,
        }
      } else {
        data = {
          user,
          product: productRef.current.value,
          message: descriptionRef.current.value,
          price: priceRef.current.value,
        }
      }
      await createNewAdService(data);
      await getAds();
      setNewAdForm(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  }

  // File input change / click
  const handleFileChange = (e) => { setFileImage(e.target.files[0]); }
  const handleInputClick = (e) => { inputFile.current.click() }

  //UseEffects
  useEffect(() => {
    getAds();
  }, [])

  // Get Posts
  const getAds = async () => {
    try {
      const response = await getAdsService();
      console.log(response);
      setAds(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  // GSAP Animations
  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.3 });
  };
  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };


  // REFs
  const inputFile = useRef(null);
  const productRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);

  // Render
  return (
    <div className="w-4/6 flex flex-col">
      {(ads && ads.length !== 0) && <button onClick={() => setNewAdForm(!newAdForm)} type="submit" className='mt-8 z-0 self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>New Ad</button>}

      {/* Add story form */}
      {newAdForm &&
        <div style={{ width: "inherit" }} className='fixed z-20 top-0 w-auto bg-black pt-5 mb-5 flex flex-col justify-center justify-items-center content-center px-5 border-b border-gray-600'>
          <ImCross onClick={() => setNewAdForm(false)} onMouseEnter={onEnter} onMouseLeave={onLeave} />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center justify-items-center content-center items-center">
              <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center">
                <input ref={productRef} type="text" name="product" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Enter product you're selling" />
              </div>
              <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center mt-5">
                <input ref={descriptionRef} type="text" name="description" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Enter description of the product" />
              </div>
              <div className="w-5/6 flex flex-row justify-center justify-items-center content-center items-center mt-5">
                <input ref={priceRef} type="text" name="price" className="w-full py-2 pl-5 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Enter price" />
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
      {ads === null && <ClipLoader />}
      {/* We do this if user has no people following */}
      {((ads && ads.errorMessage === "User is following anyone.") || (ads && ads.length === 0)) &&
        (<div className='flex flex-col justify-center justify-items-center content-center items-center w-full h-full mt-12'>
          <p>No ads yet, create one</p>
          <button onClick={() => setNewAdForm(!newAdForm)} type="submit" className='mt-8 z-0 self-center ml-5 px-4 py-2 h-12 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'>New Ad</button>
        </div>)
      }
      {/* After loading posts */}
      {
        (ads !== null && !ads.errorMessage) && ads.map(elem => {
          return (<Ad data={elem} key={uuid()} />)
        })
      }
    </div >

  )
}
