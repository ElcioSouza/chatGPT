import React, { ReactNode } from 'react'
import IconClose from './icons/iconclose';
import IconAdd from './icons/iconadd';
import SidebarButton from './SidebarButton';
import IconTrash from './icons/icontrash';

type Props = {
    children: ReactNode;
    open: boolean;
    close: () => void;
    clear: () => void;
    newChat: () => void;
}

export const SideBar = ({ open, close, clear, newChat, children }: Props) => {
    /* https://reactsvgicons.com/search?q=close */
  return (
    <section className={`fixed left-0 top-0 bottom-0 text-white 
    ${open ? 'w-screen bg-gray-600/75': 'w-0'} md:w-64 md:static`}>
        <div className={`transition-all trasiton-200 flex h-screen 
            ${open ? 'ml-0': '-ml-96'} md:ml-0`}>
                <div className="flex flex-col w-64 p-2 bg-gray-900">
                    
                    <div  onClick={newChat} className="flex items-center p-3 rounded-md text-sm cursor-pointer 
                    border border-white/20 hover:bg-gray-500/20">
                        <IconAdd width={16} height={16} className="mr-3" />
                        Nova Conversa
                    </div>
                
                    <div className="flex-1 pt-2 overflow-y-auto">
                        {children}
                    </div>

                    <div className="border-t border-gray-700 pt-2">
                        <SidebarButton
                            icon={<IconTrash />}
                            label="Limpar todas as conversas"
                            onClick={clear}
                        />
                    </div>
                </div>

                    <div 
                    onClick={close} 
                    className="flex justify-center items-center cursor-pointer w-10 h-10 md:hidden"
                    > 
                        <IconClose width={25} height={25} />
                    </div>
        </div>
    </section>
  )
}
