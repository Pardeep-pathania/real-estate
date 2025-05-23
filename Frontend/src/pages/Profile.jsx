import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser}= useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1
      className='text-3xl font-semibold text-center my-7'>
        Profile</h1>
        <form className='flex flex-col gap-4'>

          <img src={currentUser.userData?.photo} alt="profile pic" 
          className='rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2 shadow-slate-800 shadow-lg'/>

          <input type="text" placeholder='username' id='username'
          className='border p-3 rounded-lg' />
          <input type="text" placeholder='email' id='email'
          className='border p-3 rounded-lg' />
          <input type="text" placeholder='password' id='password'
          className='border p-3 rounded-lg' />

          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>

        </form>

<div className="flex justify-between mt-5">
  <span className='text-red-700 cursor-pointer'>Delete account</span>

  <span className='text-red-700 cursor-pointer'>Sign out</span>
</div>

    </div>
  )
}

export default Profile
