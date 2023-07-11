import React from 'react'
import ChatMessageItem from './ChatMessageItem';
import ChatMessageInput from './ChatMessageInput';

interface Props {
    disabled: boolean
    sendMessage: (message: string) => void;
}

export default function Footer({disabled,sendMessage}: Props) {
  return (
    <footer className="w-full border-t border-t-gray-600 p-2">
        <div className="max-w-4xl m-auto">
            <ChatMessageInput 
                sendMessage={sendMessage}
                disabled={disabled}
            />
            <div className="pt-3 text-center text-xs text-gray-300">
                        Rodapé
            </div>
        </div>
    </footer>
  )
}
