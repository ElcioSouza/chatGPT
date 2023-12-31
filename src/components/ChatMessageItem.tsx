import { ChatMenssage } from '@/types/chatmessage'
import React from 'react'
import IconUser from './icons/iconuser';
import IconRobot from './icons/iconrobot';

interface Props {
    item: ChatMenssage;
}

export default function ChatMessageItem({item}: Props) {
  return (
    <div className={`py-5 px-5 ${item.author == 'ai' && 'bg-gray-600/50'}`}>
        <div className="max-w-4xl m-auto flex">
            {/* icone */}
            <div className={`w-10 h-10 flex justify-center items-center mx-4 md:ml-0 rounded 
                  ${item.author === 'ai' ? 'bg-green-900': 'bg-blue-900'}`}>
                  {item.author === 'me' && <IconUser width={24} height={24} />}
                  {item.author === 'ai' && <IconRobot width={24} height={24} />} 
            </div>
            {/* Mensagem */}
            <div className="flex-1 text-base whitespace-pre-wrap">
                  {item.body}
            </div>
        </div>
    </div>
  )
}
