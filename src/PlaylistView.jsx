import React from "react";
import { assets } from "./assets/assets";

export default function PlaylistView({
    playlist,
    onBack,
    setCurrentSong,
    setIsPlaying,
    setPlayPauseIcon,
    audioRef,
    setCurrentPlaylist,
    setCurrentIndex
}) {

    const handlePlaySong = (song) => {
        if (audioRef.current) {
            audioRef.current.src = song.file;  // ✅ update audio src first
            audioRef.current.play();           // ✅ play immediately
        }

        setCurrentSong(song);                // update state for UI
        setCurrentPlaylist(playlist.songs);
        setCurrentIndex(playlist.songs.indexOf(song));
        setIsPlaying(true);
        setPlayPauseIcon(assets.pause_icon);
    };


    return (
        <div className="p-5">
            {/* Back button */}
            <img
                src={assets.back_arrow}
                alt="back"
                className="w-6 h-6 p-1 rounded-full hover:bg-gray-600 cursor-pointer mb-5 transition-transform hover:scale-110"
                onClick={onBack}
            />

            <h2 className="text-2xl font-bold mb-4">{playlist.name}</h2>
            <p className="text-white/60 mb-6">{playlist.desc}</p>

            <div className="flex flex-wrap gap-4">
                {playlist.songs?.map((song, i) => (
                    <div
                        key={i}
                        className="bg-[#1f1f1f] p-4 rounded-lg w-48 relative group cursor-pointer"
                        onClick={() => handlePlaySong(song)}
                    >
                        <img src={song.image} alt={song.name} className="rounded-md mb-2" />
                        <p className="font-semibold">{song.name}</p>
                        <p className="text-sm text-white/60">{song.artist}</p>

                        {/* Hover play icon */}
                        <img
                            src={assets.play_icon}
                            alt="play"
                            className='invert-100 absolute bottom-3 right-4 w-10 h-10 p-2 rounded-full bg-[rgb(200,50,200)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'
                            onClick={(e) => {
                                e.stopPropagation(); // prevent card click from firing twice
                                handlePlaySong(song);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
