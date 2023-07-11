import { Chat } from '@/types/chat'
import React from 'react'
import ChatPlaceholder from './ChatPlaceholder'
import ChatMessageItem from './ChatMessageItem'
import ChatMessageLoading from './ChatMessageLoading';

interface Props {
  chat: Chat | undefined,
  loading: boolean;
}

export default function ChatArea({chat,loading}: Props) {
  const scrollArea = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollArea.current?.scrollTo(0, scrollArea.current?.scrollHeight) // scrollArea.current?.scrollHeigh-> altura do conteudo completo dessa area
   }, [loading, chat?.messages.length])
   


  return (
    <section ref={scrollArea} className="flex-auto h-0 overflow-y-auto">
        {!chat &&   <ChatPlaceholder />}
        {chat && chat.messages.map((item,index) => (
            <ChatMessageItem 
                key={index}
                item={item}
            />
        ))}
        {loading && <ChatMessageLoading />}
    </section>
  )
}
