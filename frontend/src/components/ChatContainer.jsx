import React, { useEffect, useRef } from 'react'
import assets, {messagesDummyData} from '../assets/assets'
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({selectedUser, setSelectedUser}) => {

    const scrollEnd = useRef(null);

    useEffect(() => {
        if(scrollEnd.current){
            scrollEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

  return selectedUser ? (
    <div className='h-full min-h-0 overflow-hidden relative backdrop-blur-lg flex flex-col'>
        {/* Header */}
      <div className='flex shrink-0 items-center gap-3 py-3 mx-4 border-b border-gray-500'>
            <img src={assets.profile_martin} alt="" className='w-8 rounded-full' />
            <p>Martin Johnson
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
            </p>
            <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
            <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
        </div>

        {/* Chat area */}
        <div className='min-h-0 flex-1 overflow-y-auto pb-20'>
            {messagesDummyData.map((message, index) => (
                <div key={index} className={`flex items-end gap-2 justify-end ${message.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
          {message.image ? (
            <img src={message.image} alt="" className='max-w-57.5 border border-gray-700 rounded-lg overflow-hidden mb-8'/>
          ):(
            <p className={`p-2 max-w-50 md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${message.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{message.text}</p>
          )}
          <div className="text-center text-xs">
            <img src={message.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin } alt="" className='w-7 rounded-full' />
            <p className='text-gray-500'>{formatMessageTime(message.createdAt) }</p>
          </div>

        </div>
            ))}
            <div ref={scrollEnd}> </div>
        </div>

        {/* Bottom */}
        <div className='shrink-0 w-full flex items-center gap-2 p-2 border-t border-gray-500'>
            <div className='flex items-center gap-2 flex-1 border border-gray-500 rounded-full p-2'>
                <input type="text" placeholder='Type a message...' className='bg-transparent outline-none text-white placeholder-[#c8c8c8] flex-1' />
                <input type="file" id='image' accept='image/png, image/jpeg' hidden />
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt="gallery" className='w-5 mr-2 cursor-pointer' />
                </label>
            </div>
            <img src={assets.send_button} alt="send" className='w-7 cursor-pointer' />

        </div>
      </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-full gap-2'>
        <img src={assets.logo_icon} alt="" className='max-w-16' />
        <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer