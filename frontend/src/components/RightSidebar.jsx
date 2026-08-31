import React, { useContext } from 'react'
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {

  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = React.useState([]);
  const [selectedMedia, setSelectedMedia] = React.useState(null);

  //Get all images from messages and set them to msgImages state
  React.useEffect(() => {
    setMsgImages(
      messages.filter(msg => typeof msg?.image === 'string' && msg.image.trim()).map(msg => msg.image.trim())
    );
  }, [messages]);

  const handleOpenMedia = (url) => {
    if (!url || typeof url !== 'string') return;
    const safeUrl = url.trim();
    if (!safeUrl) return;
    setSelectedMedia(safeUrl);
  };

  return selectedUser && (
    <div className={`bg-[#010502]/10 text-white w-full relative overflow-y-scroll ${(selectedUser ? 'max-md:hidden' : '')}`}>

      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon}
          className='w-20 aspect-square rounded-full' />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName}
        </h1>
        <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4' />

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='grid grid-cols-2 gap-2 mt-2 max-h-[250px] overflow-y-auto'>
          {msgImages.map((url, index) => (
            <div key={`${url}-${index}`} onClick={() => handleOpenMedia(url)} className='cursor-pointer rounded-md overflow-hidden border border-white/10 bg-black/20 aspect-square'>
              <img src={url} alt='Shared media' className='w-full h-full object-cover block' />
            </div>
          ))}
        </div>
      </div>

      {selectedMedia && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4' onClick={() => setSelectedMedia(null)}>
          <div className='relative w-[90vw] max-w-[480px] max-h-[80vh] bg-[#0d1117] rounded-xl overflow-hidden border border-white/10 shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMedia(null)}
              className='absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white hover:bg-black'
            >
              ✕
            </button>
            <img src={selectedMedia} alt='Selected media' className='block max-h-[80vh] w-full object-contain mx-auto' />
          </div>
        </div>
      )}

      <button onClick={() => logout()} className='absolute bottom-3 left-0 w-full bg-[#ec0f0f] py-2 px-20 rounded-full text-sm font-medium'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar