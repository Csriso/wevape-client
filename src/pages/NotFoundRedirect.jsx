import react, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/404");
  }, [])

  return (
    <>
      <div className="bg-transparent absolute bottom-0 right-0 mb-3 mr-2"><p>Credit for the ThreeJS 3D script to Starbeamrainbowlabs @<a href="https://codepen.io/sbrl" className='ml-1'>Codepen</a></p></div>
      <iframe src="/smoke.html" className="w-screen h-screen" frameborder="0" title="Title"></iframe>
    </>
  );
}

