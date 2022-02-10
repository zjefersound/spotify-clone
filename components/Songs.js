import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="text-white p-8 pb-20 flex flex-col space-y-1">
      {playlist?.tracks.items.map((track, index) => (
        <Song key={track.id} track={track} order={index}/>
      ))}
    </div>
  )
}

export default Songs
