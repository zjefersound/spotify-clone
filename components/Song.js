import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ order, track: data }) {
  const { track = {} } = data;
  const spotifyApi = useSpotify();

  return (
    <div className="grid grid-cols-2 text-gray-500">
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
        <p>{millisToMinutesAndSeconds(track.duration_ms )}</p>
      </div>
    </div>
  )
}

export default Song
