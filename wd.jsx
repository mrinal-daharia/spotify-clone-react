import React, { useState, useRef, useEffect } from 'react'
import { assets } from './assets/assets'
import { albumsData } from './assets/assets';
import LibraryCard from './LibraryCard'
import MusicCard from './MusicCard';

export default function App() {
  const heading = ["Create you fisrt playlist","Let's find some podcasts to follow"];
  const description = ["It's easy, we'll help you", "we'll keep you updated on new episodes"];
  const buttonName = ["Create Playlist","Browse Podcasts"]
  const gridElements = ["Legal","Safety & PrivacyCenter","PrivacyPolicy","Cookies","AboutAds","Accessibility"]

  // Audio states
  const [audioDuration, setAudioDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1) // 0 to 1

  const [playPauseIcon, setPlayPauseIcon] = useState(assets.play_icon)
  const [currentSong, setCurrentSong] = useState(assets.dummySong)

  // album data length
  const albumsLength = albumsData.length;

  // Reference to audio element
  const audioRef = useRef(null)

  // Play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
      setPlayPauseIcon(assets.pause_icon)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
      setPlayPauseIcon(assets.play_icon)
    }
  }

  // Update current time and duration
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const setDuration = () => setAudioDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', setDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', setDuration)
    }
  }, [])

  // Seek handler
  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  // Volume handler
  const handleVolume = (e) => {
    const audio = audioRef.current
    if (!audio) return
    const newVolume = Number(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
  }

  // Format time mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <>
      <header className='flex justify-between items-center w-full h-15 px-7'>
        <div className='flex gap-5 items-center'>
          <img src={assets.spotify_logo_black} alt="spotify" className='w-9 h-9 invert-100'/>
          <div className=' flex gap-3'>
            <img src={assets.home_icon} alt="home" className='w-12 h-12 invert-100 bg-[#e0e0e0] p-3 rounded-full' />
            <input type="search" name="search" id="search" placeholder='What do you want to play?' className='bg-[#1f1f1f] px-5 width w-md rounded-full'/>
          </div>
        </div>
        <div className='flex  items-center'>
          <ul className='flex gap-2 items-center font-bold'>
            <li>Premium</li>
            <li>Support</li>
            <li>Download</li>
            <li><img src={assets.line} alt="line" className='w-8 h-7 invert-100 mx-3'/></li>
            <li>Install App</li>
            <li className='mx-5'>Sign up</li>
            <li><button className='bg-white text-black py-3 px-8 rounded-full'>Log in</button></li>
          </ul>
        </div>
      </header>
      <main className='flex w-full p-2 gap-2'>
        <div class="main-left" className='bg-[#121212] w-[30vw] h-[82vh] p-5 px-0 rounded-md'>
          <div class="main-left-first" className="flex justify-between px-5 font-bold mb-10">
            <p>Your Library</p>
            <p>+</p>
          </div>
          <div class="main-left-second px-2 ">
            {heading.map((title,i)=>
            (
              <LibraryCard 
                heading = {title}
                description = {description[i]}
                buttonName = {buttonName[i]}
              />
            ))}
          </div>
          <div class="main-left-third" className='inline-grid grid-flow-row gap-4 p-5 pt-20'
            style={{ gridTemplateColumns: 'repeat(4, max-content)', gridAutoRows: 'max-content' }}>
            {gridElements.map((gridElements, index)=>
            (
              <div key={index} className=" text-white/60 text-[0.7rem] rounded-lg">{gridElements}</div>
            ))}
          </div>
          <div className='main-left-fourth p-5'>
            <button className='border border-gray-300 py-1 px-5 rounded-full hover:scale-103'>English</button>
          </div>
        </div>
        <div class="main-right" className='bg-[#121212] w-[70vw] h-[82vh] rounded-md'>
          <div className='flex justify-between p-5 px-10'>
            <p className='font-bold text-2xl'>Trending songs</p>
            <p>Show all</p>
          </div>
          <div className='music-card-container w-full p-5 flex overflow-scroll scrollbar-hide'>
           {albumsData.map((album)=>
          (
            <MusicCard 
            key={album.id}
            image = {album.image} 
            playlistName={album.name} 
            description={album.description}
            // onClick:alert={"you are clicked"}
            />
          ))}
          </div>
           <div className='music-card-container w-full p-5 flex overflow-scroll scrollbar-hide'>
           {albumsData.map((album)=>
          (
            <MusicCard 
            key={album.id}
            image = {album.image} 
            playlistName={album.name} 
            description={album.description}
            />
          ))}
          </div>
        </div>
      </main>
      <footer className='flex justify-between items-center w-full h-16 px-5 py-1 rounded-lg'>
        <div className='flex gap-3 w-[25vw]'>
          <img src={assets.img6} alt="default music image" className='w-12 h-12 rounded-sm'/>
          <span>
            <p className='text-sm font-sans font-bold'>Dil Mein Ho Tum</p>
            <p className='text-xs text-white/60'>Armaan Malik</p>
          </span>
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <span className='flex gap-5'>
            <img src={assets.shuffle_icon} alt="shuffle"  className='w-4 h-4'/>
            <img src={assets.prev_icon} alt="previous"  className='w-4 h-4'/>
            <img src={playPauseIcon} alt="play"  className='w-4 h-4' onClick={togglePlay}/>
            <img src={assets.next_icon} alt="next"  className='w-4 h-4'/>
            <img src={assets.loop_icon} alt="loop"  className='w-4 h-4'/>
          </span>
          <span className='flex gap-3 items-center w-[30vw]'>
            <p className='text-xs'>{formatTime(currentTime)}</p>
            <input type="range"  min="0" max={audioDuration} value={currentTime}
              onChange={handleSeek} name="progress bar" id="progressBar"
              className="w-120 h-1 rounded-lg appearance-none bg-gray-400 accent-green-500" />
            <p className='text-xs'>{formatTime(audioDuration)}</p>
          </span>
        </div>
        <div className='flex items-center w-[25vw] gap-3 justify-end'>
          <img src={assets.plays_icon} alt="plays" className='w-4 h-4'/>
          <img src={assets.mic_icon} alt="mic" className='w-4 h-4'/>
          <img src={assets.queue_icon} alt="queue" className='w-4 h-4'/>
          <img src={assets.volume_icon} alt="volume" className='w-4 h-4'/>
          {/* <hr className='w-20 h-1 bg-white rounded-xs'/> */}
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume}
              className="w-24 h-1 rounded-lg appearance-none bg-gray-400 accent-green-500"/>
          <img src={assets.mini_player_icon} alt="mini player" className='w-4 h-4'/>
          <img src={assets.zoom_icon} alt="zoom" className='w-4 h-4'/>
        </div>
      </footer>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentSong} />
    </>
  )
}
