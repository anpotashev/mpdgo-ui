import React, { useEffect } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import {useAppSelector} from "@/app/hooks.ts";

const STREAM_URL = import.meta.env.VITE_STREAM_URL;

export const StreamPlayerV2: React.FC = () => {
    const playing = useAppSelector((state) => state.status?.status?.state === "play");
    const {load, play, stop} = useAudioPlayer();

    useEffect(() => {
        if (playing) {
            load(STREAM_URL, {
                initialVolume: 0.75,
            })
            play()
        } else {
            stop();
        }
    }, [playing]);

    return <></>;
};
