import React, { useEffect } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";

const STREAM_URL = import.meta.env.VITE_STREAM_URL;

export const StreamPlayerV2: React.FC = () => {
    const {playing} = useCurrentPlaylistLogic();
    const {load, play, stop} = useAudioPlayer();

    useEffect(() => {
        if (playing) {
            load(STREAM_URL, {
                html5: true,
                format: "mp3",
                autoplay: true,
            })
            play()
        } else {
            stop();
        }
    }, [playing]);

    return <></>;
};
