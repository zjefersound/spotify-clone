import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
  LogoutIcon
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';

export default function Sidebar() {
  const { data: session, status } = useSession(); 

  console.log('session',session);
  const menuSections = [
    {
      items: [
        { Icon: LogoutIcon, label: "Log out", onClick: () => signOut() },
      ]
    },
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
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
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
        {/* Playlists */}
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name</p>
      </div>
    </div>
  )
}
