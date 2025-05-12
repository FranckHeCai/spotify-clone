import { create } from "zustand";

export const usePlayerStore = create((set) => ({
    isPlaying : false,
    currentMusic: {
        playlist : null, song: null, songs: []
    },
    backgroundColor: "bg-green-600",
    volume: 0.5,
    setVolume: (volume) => set({volume}),
    setBackgroundColor: ({backgroundColor}) => set({backgroundColor}),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentMusic: (currentMusic) => set({ currentMusic })
}))