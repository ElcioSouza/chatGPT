import React from 'react'
import IconMenu from './icons/iconmenu';
import IconAdd from './icons/iconadd';

interface Props {
    title: string;
    openSidebarClick: () => void;
    newChatClick: () => void;
}

export default function Header({title,openSidebarClick,newChatClick}:Props) {

  return (
    <header className="flex justify-between items-center w-full border-b border-t-gray-600 p-2 md:hidden">
      <div onClick={openSidebarClick}>
          <IconMenu width={24} height={24} />
      </div>
      <div className='mx-2 truncate'>{title}</div>
      <div onClick={newChatClick}>
          <IconAdd width={24} height={24} />
      </div>
    </header>
  )
}
