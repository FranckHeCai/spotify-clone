import { usePlayerStore } from "@/store/playstore";

const SideMenuCardText = ({id, title}) => {
    const { isPlaying, currentMusic } = usePlayerStore(state => state)
    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
    return (
            <h3 className={`${isPlayingPlaylist ? "text-green-600" : ""}`}
            >{title}</h3>
    );
};

export default SideMenuCardText;