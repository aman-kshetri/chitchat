import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';

const ProfilePage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("Martin Johnson");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <div className='flex min-h-full items-center justify-center overflow-y-auto backdrop-blur-2xl'>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full flex-1'>
          
          <h3>Profile details</h3>
          
          <label htmlFor="Avatar" className='flex items-center gap-4'>
            <input onChange={(e)=>setSelectedImage(e.target.files[0])} type="file" name="Avatar" id="Avatar" accept='.png, .jpg, .jpeg' className='hidden' />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            Upload profile image
          </label>
          
          <input type="text" required placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none' />
          
          <textarea rows={4} required placeholder='Provide short bio... ' value={bio} onChange={(e)=>setBio(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none' />
          
          <button type='submit' className='w-full rounded-full bg-[#ec0f0f] px-4 py-2 text-sm font-medium'>
            Save Changes
          </button>
        </form>

        <img src={assets.logo_icon} alt="" className='w-5 cursor-pointer' />
      </div>
    </div>
  )
}

export default ProfilePage
