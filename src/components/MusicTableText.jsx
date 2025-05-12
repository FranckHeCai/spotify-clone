import { usePlayerStore } from "@/store/playstore";

const MusicTableText = ({text, songId, albumId}) => {
    const { isPlaying, currentMusic } = usePlayerStore(state => state)
    const isPlayingSong = isPlaying && currentMusic?.playlist.id === albumId && currentMusic?.song.id === songId
    return (
            <h3 className={`${isPlayingSong ? "text-green-600" : ""}`}
            >{text}</h3>
    );
};

export default MusicTableText;