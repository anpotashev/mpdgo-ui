import {useEffect, useRef} from "react";
import {useAppSelector} from "@/app/hooks";


const STREAM_URL = import.meta.env.VITE_STREAM_URL;

export const StreamPlayer = () => {
    const status = useAppSelector((state) => state.status.status);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (status?.state === "play") {
            audio.src = STREAM_URL;
            audio.load();
            audio.play();
        } else {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
        }
    }, [status?.state]);

    return <audio ref={audioRef} hidden controls={false} preload="auto"/>;
};
