import { Play } from "@/icons/PlayerIcons";
import { Pause } from "@/icons/PlayerIcons";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/playstore";
import PlayerCurrentSong from "./PlayerCurrentSong";
import { Slider } from "@/components/ui/slider"
import { VolumeFull, VolumeLow, VolumeMedium, VolumeSilenced } from "@/icons/VolumeIcons";

export const PlayIcon = () => <svg viewBox="0 0 24 24" class="h-8 w-8" fill="black"
><path fill="black" d="M8 5.14v14l11-7-11-7z"></path></svg>

export const PauseIcon = () => 
<svg className="h-8 w-8" aria-hidden="true" viewBox="0 0 24 24" fill="black">
    <g transform="translate(4, 4)">
        <path fill="black"
        d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
        >
        </path>      
    </g>
  </svg>


export const VolumeController = () => {
    const {volume, setVolume} = usePlayerStore(state => state)
    const previousVolumeRef = useRef(volume)
    const isVolumeSilenced = volume === 0

    const handleVolume = () => {
        if(isVolumeSilenced){
            setVolume(previousVolumeRef.current)
        }else{
            previousVolumeRef.current = volume
            setVolume(0)
        }
        
    }

    return(
        <div className="flex gap-2 justify-center text-neutral-50">
            <button onClick={handleVolume} className="cursor-pointer active:text-green-600">
                { isVolumeSilenced
                    ? <VolumeSilenced />
                    : volume > 0 && volume < 0.3
                        ? <VolumeLow />
                        : volume > 0.3 && volume < 0.7
                            ? <VolumeMedium />
                            : <VolumeFull />
                }
            </button>
            <Slider
                defaultValue={[volume * 100]}
                value={[volume * 100]}
                max={100}
                min={0}
                className="w-[95px]"
                onValueChange={(value)=>{
                    // const [newValue] = value
                    // const volumeValue = newValue / 100
                    // volumeRef.current = volumeValue
                    // audioRef.current.volume = volumeValue
                    const [newVolume] = value
                    const volumeValue = newVolume / 100
                    setVolume(volumeValue)
                }}
            />
        </div>
    )
}

export const SongControl = ({audio}) =>{ 
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {

      audio.current.addEventListener("timeupdate", handleTimeUpdate)

      return () => {
        audio.current.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }, [])

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime)
    }

    const formatTime = (time) =>{
        if(time == null || isNaN(time)) return `0:00`
        const minutes = Math.floor( time / 60 )
        const seconds = Math.floor( time % 60 )

        return `${String(minutes)}:${String(seconds).padStart(2,"0")}`

    } 

    const duration = audio?.current?.duration ?? 0

    return(
        <div className="flex items-center gap-1.5 text-sm">
            <span className="opacity-50 w-10 text-center">{formatTime(currentTime)}</span>

            <Slider
                
                defaultValue={[0]}
                value={[currentTime]}
                max={audio?.current?.duration ?? 0}
                min={0}
                className="w-[500px]"
                onValueChange={(value)=>{
                    audio.current.currentTime = value
                }}
            />

            <span className="opacity-50 w-10 text-center">{formatTime(duration)}</span>
        </div>
    )
    
}

export default function Player () {
    // const [isPlaying, setIsPlaying] = useState(false)
    // const [currentSong, setCurrentSong] = useState(null)
    const audioRef = useRef()
    const {isPlaying, setIsPlaying, currentMusic, volume} = usePlayerStore(state => state)
    const {songs, playlist, song} = currentMusic
    useEffect(() => {
        isPlaying
        ? audioRef.current.play()
        : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
      audioRef.current.volume = volume
    }, [volume])
    
    
    useEffect(() => {
        
        if(song){
            const currentSong = String(song.id).padStart(2,"0")
            const src = `/music/${playlist?.id}/${currentSong}.mp3`
            audioRef.current.src = src
            audioRef.current.volume = volume
            audioRef.current.play()
        }
    }, [currentMusic])
    
    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return(
        <div className="flex  justify-between w-full  px-2 z-50">
            <div>
                <PlayerCurrentSong {...currentMusic.song} />
            </div>
            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex flex-col items-center justify-center gap-2">
                    <button onClick={handleClick} className="bg-neutral-50 rounded-full">
                    {
                        isPlaying 
                        ? <Pause className={"h-8 w-8 text-neutral-950"} />
                        : <Play className={"h-8 w-8 text-neutral-950"} />
                    }
                    </button>
                    <SongControl audio={audioRef} />
                </div>
            </div>
            <div >
                <VolumeController />
            </div>
            <audio ref={audioRef}></audio>
        </div>
    )
}