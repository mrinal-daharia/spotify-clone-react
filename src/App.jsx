import React, { useState, useRef, useEffect } from 'react'
import { assets } from './assets/assets'
import { albumsData } from './assets/assets';
import LibraryCard from './LibraryCard'
import MusicCard from './MusicCard';
import PlaylistView from './PlaylistView'


export default function App() {
  const heading = ["Create you fisrt playlist", "Let's find some podcasts to follow"];
  const description = ["It's easy, we'll help you", "we'll keep you updated on new episodes"];
  const buttonName = ["Create Playlist", "Browse Podcasts"]
  const gridElements = ["Legal", "Safety & PrivacyCenter", "PrivacyPolicy", "Cookies", "AboutAds", "Accessibility"]

  // Audio states
  const [audioDuration, setAudioDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1) // 0 to 1

  const [playPauseIcon, setPlayPauseIcon] = useState(assets.play_icon)
  const [currentSong, setCurrentSong] = useState({
    name: "Unknown Song",
    artist: "Unknown Artist",
    file: assets.dummysong,
    image: assets.img6,
  });

  const [currentPlaylist, setCurrentPlaylist] = useState(null); // currently playing playlist
  const [currentIndex, setCurrentIndex] = useState(0);           // index of the current song

  // album data length
  const albumsLength = albumsData.length;
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);


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
  

  // Go to previous song
  const prevSong = () => {
    if (!currentPlaylist || currentPlaylist.length === 0) return;
    const newIndex = currentIndex > 0 ? currentIndex - 1 : currentPlaylist.length - 1;
    const newSong = currentPlaylist[newIndex];

    if (audioRef.current) {
      audioRef.current.src = newSong.file; // set src first
      audioRef.current.play();             // play immediately
    }

    setCurrentSong(newSong);  // then update state
    setCurrentIndex(newIndex);
    setIsPlaying(true);
    setPlayPauseIcon(assets.pause_icon);
  };

  const nextSong = () => {
    if (!currentPlaylist || currentPlaylist.length === 0) return;
    const newIndex = currentIndex < currentPlaylist.length - 1 ? currentIndex + 1 : 0;
    const newSong = currentPlaylist[newIndex];

    if (audioRef.current) {
      audioRef.current.src = newSong.file;
      audioRef.current.play();
    }

    setCurrentSong(newSong);
    setCurrentIndex(newIndex);
    setIsPlaying(true);
    setPlayPauseIcon(assets.pause_icon);
  };

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
          <img src={assets.spotify_logo_black} alt="spotify" className='w-9 h-9 invert-100' />
          <div className=' flex gap-3'>
            <img src={assets.home_icon} alt="home" className='w-12 h-12 invert-100 bg-[#e0e0e0] p-3 rounded-full' />
            <input type="search" name="search" id="search" placeholder='What do you want to play?' className='bg-[#1f1f1f] px-5 width w-md rounded-full' />
          </div>
        </div>
        <div className='flex  items-center'>
          <ul className='flex gap-2 items-center font-bold'>
            <li className='cursor-pointer hover:text-white/70'>Premium</li>
            <li className='cursor-pointer hover:text-white/70'>Support</li>
            <li className='cursor-pointer hover:text-white/70'>Download</li>
            <li><img src={assets.line_icon} alt="line" className='w-8 h-7 invert-100 mx-3' /></li>
            <li className='cursor-pointer hover:text-white/70'>Install App</li>
            <li className='cursor-pointer hover:text-white/70 mx-5'>Sign up</li>
            <li><button className='cursor-pointer bg-white text-black py-3 px-8 rounded-full'>Log in</button></li>
          </ul>
        </div>
      </header>
      <main className='flex w-full p-2 gap-2'>
        <div className='bg-[#121212] w-[30vw] h-[82vh] p-5 px-0 rounded-md'>
          <div className="flex justify-between px-5 font-bold mb-10">
            <p>Your Library</p>
            <p>+</p>
          </div>
          <div>
            {heading.map((title, i) =>
            (
              <LibraryCard
                key={i}
                heading={title}
                description={description[i]}
                buttonName={buttonName[i]}
              />
            ))}
          </div>
          <div className='inline-grid grid-flow-row gap-4 p-5 pt-20'
            style={{ gridTemplateColumns: 'repeat(4, max-content)', gridAutoRows: 'max-content' }}>
            {gridElements.map((gridElements, index) =>
            (
              <div key={index} className=" text-white/60 text-[0.7rem] rounded-lg">{gridElements}</div>
            ))}
          </div>
          <div className='main-left-fourth p-5'>
            <button className='border border-gray-300 py-1 px-5 rounded-full hover:scale-103'>English</button>
          </div>
        </div>
        <div className="main-right bg-[#121212] w-[70vw] h-[82vh] rounded-md overflow-y-auto scrollbar-hide">
          {selectedPlaylist ? (
            // When a playlist is clicked → show playlist songs
            <PlaylistView
              playlist={selectedPlaylist}
              onBack={() => setSelectedPlaylist(null)}
              setCurrentSong={setCurrentSong}
              setIsPlaying={setIsPlaying}
              setPlayPauseIcon={setPlayPauseIcon}
              audioRef={audioRef}
              setCurrentPlaylist={setCurrentPlaylist}   // ✅ add this
              setCurrentIndex={setCurrentIndex}         // ✅ add this
            />
            
          ) : (
            // Default → trending songs
            <>
              <div className='flex justify-between p-5 px-10'>
                <p className='font-bold text-2xl'>Trending songs</p>
                <p className='cursor-pointer hover:text-white/70'>Show all</p>
              </div>
              <div className='music-card-container w-full p-5 flex overflow-scroll scrollbar-hide'>
                {albumsData.map((album) => (
                  <MusicCard
                    key={album.id}
                    image={album.image}
                    playlistName={album.name}
                    description={album.desc}
                    onClick={() => setSelectedPlaylist(album)}
                    onPlay={() => {
                      const firstSong = album.songs[0];
                      if (audioRef.current) {
                        audioRef.current.src = firstSong.file; // set audio src first
                        audioRef.current.play();               // play immediately
                      }
                      setCurrentSong(firstSong);          // then update state
                      setCurrentPlaylist(album.songs);
                      setCurrentIndex(0);
                      setIsPlaying(true);
                      setPlayPauseIcon(assets.pause_icon);
                    }}
                  />
                ))}
              </div>
            </>
          )}  
        </div>

      </main>
      <footer className='flex justify-between items-center w-full h-16 px-5 py-1 rounded-lg'>
        <div className='flex gap-3 w-[25vw]'>
          <img src={currentSong.image || assets.img6} alt="current music" className='w-12 h-12 rounded-sm' />
          <span>
            <p className='text-sm font-sans font-bold'>{currentSong.name || "Unknown Song"}</p>
            <p className='text-xs text-white/60'>{currentSong.artist || "Unknown Artist"}</p>
          </span>
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <span className='flex gap-5'>
            <img src={assets.shuffle_icon} alt="shuffle" className='w-4 h-4' />
            <img src={assets.prev_icon} alt="previous" className='w-4 h-4' onClick={prevSong} />
            <img src={playPauseIcon} alt="play" className='w-4 h-4' onClick={togglePlay} />
            <img src={assets.next_icon} alt="next" className='w-4 h-4' onClick={nextSong} />
            <img src={assets.loop_icon} alt="loop" className='w-4 h-4' />
          </span>
          <span className='flex gap-3 items-center w-[30vw]'>
            <p className='text-xs'>{formatTime(currentTime)}</p>
            <input type="range" min="0" max={audioDuration} value={currentTime}
              onChange={handleSeek} name="progress bar" id="progressBar"
              className="w-120 h-1 rounded-lg appearance-none bg-gray-400 accent-green-500" />
            <p className='text-xs'>{formatTime(audioDuration)}</p>
          </span>
        </div>
        <div className='flex items-center w-[25vw] gap-3 justify-end'>
          <img src={assets.plays_icon} alt="plays" className='w-4 h-4' />
          <img src={assets.mic_icon} alt="mic" className='w-4 h-4' />
          <img src={assets.queue_icon} alt="queue" className='w-4 h-4' />
          <img src={assets.volume_icon} alt="volume" className='w-4 h-4' />
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume}
            className="w-24 h-1 rounded-lg appearance-none bg-gray-400 accent-green-500" />
          <img src={assets.mini_player_icon} alt="mini player" className='w-4 h-4' />
          <img src={assets.zoom_icon} alt="zoom" className='w-4 h-4' />
        </div>
      </footer>

      {/* Hidden audio element */}
      <audio ref={audioRef}/> 
    </>
  )
}
