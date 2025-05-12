const PlayerCurrentSong = ({image, title, artists}) => {
    return (
        <div className="flex items-center gap-4 overflow-hidden w-[200px]">
            <picture className="w-14 h-14 rounded bg-neutral-800 overflow-hidden">
                <img  src={image} alt={title} />
            </picture>
            <div className="flex flex-col justify-center gap-1.5">
                <h3 className="text-sm">{title}</h3>
                <h4 className="text-xs text-neutral-400">{artists?.join(", ")}</h4>
            </div>
        </div>
    );
};

export default PlayerCurrentSong; 