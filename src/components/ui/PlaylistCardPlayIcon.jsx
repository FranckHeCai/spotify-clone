import {PauseIcon, PlayIcon} from '@/components/Player';
import { usePlayerStore } from '@/store/playstore';
const PlaylistCardPlayIcon = ({id}) => {
    const { isPlaying, currentMusic } = usePlayerStore(state => state)
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
    return (
        <span className="absolute transition-all right-5 bottom-18 translate-y-4 duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10 rounded-full bg-green-600 p-2">
                {
                    isPlayingPlaylist
                        ? <PauseIcon />
                        : <PlayIcon />
                }
        </span>
    );
};

export default PlaylistCardPlayIcon;