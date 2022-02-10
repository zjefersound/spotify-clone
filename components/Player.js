import { ReplyIcon, SwitchHorizontalIcon, VolumeUpIcon } from "@heroicons/react/outline";
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player() {
  const spotifiApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifiApi.getMyCurrentPlaybackState().then(data => {
      if (data.body?.is_playing) {
        spotifiApi.pause();
        setIsPlaying(false);
      } else {
        spotifiApi.play();
        setIsPlaying(true);
      }
    })
  }

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifiApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackId(data.body?.item?.id);
        spotifiApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifiApi.setVolume(volume).catch(err => {});
    }, 300),
    []
  );

  useEffect(() => {
    if (spotifiApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifiApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div
      className="
        h-20 bg-gradient-to-b from-black to-gray-900 text-white
        grid grid-cols-3 text-xs md:text-base px-2 md:px-8
        border-t border-gray-800
      "
    >
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images[0]?.url} alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p className="text-xs text-gray-400">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center">
        <div className="flex flex-grow-1 items-center space-x-4">
          <SwitchHorizontalIcon className="button text-gray-400" />
          <RewindIcon
            onClick={() => spotifiApi.skipToPrevious()}
            className="button text-gray-400"
          />
          {isPlaying
            ? <PauseIcon onClick={handlePlayPause} className="button h-10 w-10 hover:scale-105" />
            : <PlayIcon onClick={handlePlayPause} className="button h-10 w-10 hover:scale-105" />
          }
          <FastForwardIcon
            onClick={() => spotifiApi.skipToNext()}
            className="button text-gray-400"
          />
          <ReplyIcon className="button text-gray-400" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <VolumeUpIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={e => setVolume(Number(e.target.value))}
        />
        <VolumeDownIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
}

export default Player;