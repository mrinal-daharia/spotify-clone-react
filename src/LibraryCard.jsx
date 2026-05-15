import React from 'react'

export default function LibraryCard({heading,description,buttonName}) 
{
  return (
    <>
    
        <div className='w-full bg-[#1f1f1f] rounded-md p-5 py-4 font-bold mt-6'>
            <p className=''>{heading}</p>
            <p className='my-2 text-sm'>{description}</p>
            <button className='bg-white text-black py-[5px] px-5 mt-2 rounded-full text-sm'>{buttonName}</button>
        </div>
    
    </>
  )
}
