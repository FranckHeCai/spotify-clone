import { usePlayerStore } from "@/store/playstore";

const MusicTableButton = ({id, songId}) => {
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
            setCurrentMusic({songs, playlist, song: songs[0]})
        })
    }
    return (
        <button class="hidden h-full group-hover:flex group-hover:items-center absolute left-[-8px] cursor-pointer">
            <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor">
                <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
            </svg>
        </button>
    );
};

export default MusicTableButton;