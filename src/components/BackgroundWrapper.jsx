import { usePlayerStore } from "@/store/playstore";

const BackgroundWrapper = ({children}) => {
    const { backgroundColor, setBackgroundColor } = usePlayerStore(state => state)
    return (
        <div className={`relative transition-all duration-500 ${backgroundColor}`} id="playlist-container">
            {children}
        </div>
    );
};

export default BackgroundWrapper;