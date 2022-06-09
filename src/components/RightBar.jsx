import React from 'react'

export default function RightBar() {
    return (<>
        <div id='RightBarHolder' className='w-1/6'></div>

        <div id="rightBar" className="fixed right-0 h-full w-1/6 px-4 py-8 border-l bg-black border-gray-600">
            {/* <div className="relative mt-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input type="text" className="w-full py-2 pl-10 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
            </div> */}

            <div className="flex flex-col justify-between content-center flex-1 mt-6">
                <p>Vape Shops recommended:</p>
                <a href="https://masquevapor.com/es/" className="flex flex-col justify-between content-center flex-1 mt-6 bg-white rounded-xl"><img src="/logomqv.svg" alt="" srcset="" /></a>
                <a href="https://www.vapeototal.net/" className="flex flex-col justify-between content-center flex-1 mt-6"><img src="/logo-vapeo.svg" alt="" srcset="" /></a>
                <a href="https://www.vapeo24.com/" className="flex flex-col justify-between content-center flex-1 mt-6"><img src="/shop2.png" alt="" srcset="" /></a>
            </div>
        </div>
    </>
    )
}
