import {Progress} from "@/components/ui/progress"
import {useAppSelector} from "@/hooks/app.ts";
import clsx from "clsx"
import React, {useState} from "react";
import {usePlaybackLogic} from "@/hooks/usePlaybackLogic.ts";
import {useCurrentPlaylistLogic} from "@/hooks/useCurrentPlaylistLogic.ts";

export function MpdPlayingProgress() {
    const [hover, setHover] = useState<{ time: number | null; percent: number | null }>({
        time: null,
        percent: null,
    })
    const {doSeekPos} = usePlaybackLogic();
    const {formatTime} = useCurrentPlaylistLogic();
    const status = useAppSelector((state) => state.status.status);
    const songPos = status?.song;
    const time = status?.time;
    const playStatus = status?.state ?? "stop";
    const current = time?.current ?? 0;
    const total = time?.full ?? 0;
    const percent = total > 0 ? (current / total) * 100 : 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!total) return;
        if (songPos == null) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left
        const newSeconds = Math.floor((x / rect.width) * total);
        const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100)
        setHover({time: newSeconds, percent: percent})
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!total) return;
        if (songPos == null) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newSeconds = Math.floor((clickX / rect.width) * total);
        doSeekPos(songPos, newSeconds);
    };

    return (
                <div className="relative">
                    <Progress
                        className={clsx("h-7",
                            playStatus === "play" ? "[&>div]:bg-blue-400" : "[&>div]:bg-gray-400"
                        )}
                        value={percent}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHover({time: null, percent: null})}
                        onClick={handleClick}/>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium pointer-events-none">
                        {formatTime(current)} / {formatTime(total)}
                        </span>

                {hover.time !== null && (<span
                    className="absolute text-xs px-2 py-1 rounded pointer-events-none
                    bg-white text-black dark:bg-black dark:text-white"
                    style={{
                        top: -28,
                        left: `${hover.percent}%`,
                        transform: "translateX(-50%)",
                    }}
                >{ formatTime(hover.time)}</span>) }
                </div>
    )
}
