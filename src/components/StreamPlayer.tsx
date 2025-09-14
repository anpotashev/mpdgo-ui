import React, {useEffect, useRef} from "react";
import {useAppSelector} from "@/app/hooks";


const STREAM_URL = "http://192.168.0.110:18000/mpd.mp3";

export const StreamPlayer: React.FC = () => {
    console.log("streamPlayer");
    const status = useAppSelector((state) => state.status.status);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        if (status?.state === "play") {
            // всегда пересоздаём src, чтобы избежать таймшифта
            audio.src = STREAM_URL;
            audio.load();
            audio.play().catch((err) => {
                console.error("Ошибка при старте воспроизведения:", err);
            });
        } else {
            audio.pause();
            audio.removeAttribute("src");
            audio.load(); // очистка буфера
        }
    }, [status?.state]);

    return <audio ref={audioRef} hidden controls={false} />;
};
