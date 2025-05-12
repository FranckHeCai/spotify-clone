import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playstore";


export function CardPlayButton ({ id, className, iconColor, songPlayed=null }) {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state)
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
    
    const handleClick = () =>{
        if(isPlayingPlaylist){
            setIsPlaying(false)
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const {songs, playlist } = data
            setIsPlaying(true)
            
            if(songPlayed){
                const selectedSong = songs.find(song => song.id === songPlayed.id)
                console.log(selectedSong)
                setCurrentMusic({songs, playlist, song: selectedSong})
                
            }else{
                setCurrentMusic({songs, playlist, song: songs[0]})
            }
        })
    }
    return(
        <button className={className}  onClick={handleClick}>
                {
                    isPlayingPlaylist
                        ? <Pause className={`h-8 w-8 ${iconColor}`} />
                        : <Play className={`h-8 w-8 ${iconColor}`} />
                }
        </button>
    )
}