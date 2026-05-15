import React from 'react'
import { assets } from './assets/assets'

export default function MusicCard({ image, playlistName, description, onClick, onPlay }) {
    return (
        <div className='music-card w-50 hover:bg-[#1f1f1f] p-2 rounded-md cursor-pointer flex-shrink-0 relative group'
            onClick={onClick}>
            <img src={image} alt="dummy image" className='w-full rounded-md' />
            <p>{playlistName}</p>
            <p className='text-sm text-white/60'>{description}</p>

            {/* Hover play icon */}
            <img 
                src={assets.play_icon} 
                alt="play" 
                className='invert-100 absolute bottom-10 right-4 w-10 h-10 p-2 
                           rounded-full bg-[rgb(200,50,200)] opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           cursor-pointer'
                onClick={(e) => { 
                    e.stopPropagation() // Prevent card click from firing
                    if (onPlay) onPlay() 
                }}
            />
        </div>
    )
}
