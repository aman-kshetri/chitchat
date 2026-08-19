import React from 'react'
import assets, {imagesDummyData} from '../assets/assets';

const RightSidebar = ({selectedUser}) => {
  return selectedUser && (
    <div className={`bg-[#010502]/10 text-white w-full relative overflow-y-scroll ${
    (selectedUser ? 'max-md:hidden' : '')}`}>

      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon}
        className='w-20 aspect-square rounded-full' />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4'/>

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='grid grid-cols-2 gap-2 mt-2 max-h-62.5 overflow-y-scroll'>
            {imagesDummyData.map((url, index) => (
                <div key={index} onClick={()=>window.open(url)}
                className='cursor-pointer rounded'>
                    <img src={url} alt="" className='h-full rounded-md' />
                </div>
              ))}
        </div>
        </div>

        <button className='absolute bottom-3 left-0 w-full bg-[#ec0f0f] py-2 px-20 rounded-full text-sm font-medium'>
            Logout
        </button>
    </div>
  )
}

export default RightSidebar