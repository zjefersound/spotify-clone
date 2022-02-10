import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifiApi = useSpotify();
  const [currentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const baseUrl = `https://api.spotify.com/v1/tracks/${currentTrackId}`
        const reqOptions = { headers: { Authorization: `Bearer ${spotifiApi.getAccessToken()}` } }
        const trackInfo = await fetch(baseUrl, reqOptions).then(res => res.json());

        setSongInfo(trackInfo);
      }
    }

    fetchSongInfo();
  }, [currentTrackId, spotifiApi]);

  return songInfo;
}

export default useSongInfo;