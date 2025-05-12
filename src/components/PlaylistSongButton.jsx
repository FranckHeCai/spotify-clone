import { Play, Pause } from "@/icons/PlayerIcons";
import { usePlayerStore } from "@/store/playstore";


export function PlaylistSongButton ({ id, songPlayed }) {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore(state => state)
    const isPlayingPlaylistSong = isPlaying && currentMusic?.playlist.id === id && currentMusic?.song.id === songPlayed?.id
    
    const handleClick = () =>{
        if(isPlayingPlaylistSong){
            setIsPlaying(false)
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const {songs, playlist } = data
            setIsPlaying(true)
            const selectedSong = songs.find(song => song.id === songPlayed.id)
            setCurrentMusic({songs, playlist, song: selectedSong})
        })
    }
    return(
        <button className="text-neutral-50 hidden h-full group-hover:flex group-hover:items-center absolute left-[-8px] cursor-pointer"  onClick={handleClick}>
                {
                    isPlayingPlaylistSong
                        ? <Pause className={`h-8 w-8 text-neutral-50`} />
                        : <Play className={`h-8 w-8 text-neutral-50`} />
                }
        </button>
    )
}