import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

export default function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    spotifyApi.getUserPlaylists().then(data => {
      setPlaylists(data.body.items)
    });
  }, [session, spotifyApi]);

  const menuSections = [
    {
      items: [
        { Icon: HomeIcon, label: "Home", onClick: () => { } },
        { Icon: SearchIcon, label: "Search", onClick: () => { } },
        { Icon: LibraryIcon, label: "Your Library", onClick: () => { } },
      ]
    },
    {
      items: [
        { Icon: PlusCircleIcon, label: "Create Playlist", onClick: () => { } },
        { Icon: HeartIcon, label: "Liked Songs", onClick: () => { } },
        { Icon: RssIcon, label: "Your episodes", onClick: () => { } },
      ]
    }
  ]
  return (
    <div
      className='
        hidden md:block
        text-gray-500 p-5 
        w-64 shrink-0 
        sm:w-[12rem] lg:w-[16rem]
        text-xs lg:text-sm border-r border-gray-900
        h-screen overflow-y-scroll scrollbar-hide
        pb-36
      '
    >
      <div className='space-y-4'>
        {menuSections.map(section => (
          <>
            {section.items.map(item => (
              <button key={item.label} onClick={item.onClick} className='flex items-center space-x-2 hover:text-white'>
                <item.Icon className="w-5 h-5" />
                <p>{item.label}</p>
              </button>
            ))}
            <hr className='border-t-[0.1px] border-gray-900' />
          </>
        ))}
        {playlists.map(playlist => (
          <p
            key={playlist.id}
            className='cursor-pointer hover:text-white text-ellipsis overflow-hidden whitespace-nowrap'
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}
