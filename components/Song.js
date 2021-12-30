import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ order, track: data }) {
  const { track = {} } = data;
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.uri]
    })
  }

  return (
    <div
      onClick={playSong}
      className="grid grid-cols-2 text-gray-500 py-2 px-4 cursor-pointer hover:bg-gray-900 rounded-lg"
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.album?.images[0].url} alt="" />
        <div>
          <p className="w-36 lg:w-72 truncate text-white">{track.name}</p>
          <p className="w-48 truncate">{track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-8">
        <p className="w-40 hidden md:inline">{track.album?.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
