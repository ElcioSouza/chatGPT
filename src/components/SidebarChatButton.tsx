import { ChatMenssage } from '@/types/chatmessage'
import React from 'react'
import IconUser from './icons/iconuser';
import IconRobot from './icons/iconrobot';
import { Chat } from '@/types/chat';
import IconChatLeft from './icons/iconchatleft';
import IconTrash from './icons/icontrash';
import IconEdit3 from './icons/iconedit3';
import IconClose from './icons/iconclose';
import IconCheck from './icons/iconcheck';

interface Props {
    chatItem: Chat;
    active: boolean;
    click: (id: string) => void;
    del: (id: string) => void;
    edit: (id: string, newTitle: string) => void;
}

export default function SidebarChatButton({ chatItem, active, click, del, edit }:Props) {
    const [deleting, setDeleting] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(chatItem.title);

    const handleClickButton = () => {
          // nao esta deletando e editando
          if(!deleting || editing) {
            click(chatItem.id.toString())
          }
    }
    
    const handleConfirmButton = () => {
         // se estiver deletando
         if(deleting) 
           del(chatItem.id.toString());
         // se estiver editando e tem um titulo digitado
         if(editing && titleInput.trim() !== '') {
          edit(chatItem.id.toString(), titleInput.trim())
         }
          // falta o padrão state
         setDeleting(false);
         setEditing(false);
    }

    const handleCancelButton = () => {
        setDeleting(false)
        setEditing(false)
    }
    
  return (
    <div onClick={handleClickButton} className={`flex items-center rounded-md p-3 text-sm cursor-pointer
    hover:bg-gray-500/10 ${active ? 'bg-gray-500/20' : 'bg-transparent'}`}>
      {/* aqui é sidebar o retangulo vai aparecer oque escreveu o usuario e os icones */}
            {/* icones */}
           <div className="mr-3">
              {!deleting && <IconChatLeft width={16} height={16} />}
              {deleting && <IconTrash width={16} height={16} />}
           </div>
           {/* Texto */}
           <div className="flex-1 text-sm overflow-x-hidden">
            {editing && 
              <input 
              className="w-full bg-transparent text-sm outline-none border border-blue-500"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              />
            }
            {!editing && 
               <div className="border border-transparent truncate">
                {!deleting && chatItem.title}
                {deleting && `Delete "${chatItem.title}"`}
               </div>
            }
           </div>
           {active && !deleting && !editing && 
                <div className="flex">
                     <div onClick={() => setEditing(true)} className="cursor-pointer mx-1
                      opacity-60 hover:opacity-100">
                        <IconEdit3 width={16} height={16} />
                     </div>
                     <div onClick={() => setDeleting(true)} className="cursor-pointer mx-1
                      opacity-60 hover:opacity-100">
                        <IconTrash width={16} height={16} />
                     </div>
                </div>
           }
           {(deleting || editing) &&
               <div className="flex">
                  <div onClick={handleConfirmButton} className="cursor-pointer mx-1
                  opacity-60 hover:opacity-100">
                    <IconCheck width={16} height={16} />
                  </div>
                  <div onClick={handleCancelButton} className="cursor-pointer mx-1
                  opacity-60 hover:opacity-100">
                    <IconClose width={16} height={16} />
                  </div>
            </div>
           }
    </div>
  )
}
