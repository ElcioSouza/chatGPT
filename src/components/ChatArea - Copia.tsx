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
  const chatCount = chat ? chat.lenght : 0;
  React.useEffect(() => {
    console.log(chatCount);
    scrollArea.current?.scrollTo(0, scrollArea.current?.scrollHeight) // scrollArea.current?.scrollHeigh-> altura do conteudo completo dessa area
   }, [loading, chatCount])

  return (
    <section ref={scrollArea} className="flex-auto h-0 overflow-y-auto">
         {/* se nao escreveu nenhuma mensagem, layout do inicio vai sair e vai ficar definido vai vim conversa do ai */}       
        {!chat &&   <ChatPlaceholder />}
        {/* icone e a mensagem */}
{/*         {chat && chat.map((item,index) => (
            <ChatMessageItem 
                key={index}
                item={item}
            />
        ))} */}
      
        {loading && <ChatMessageLoading />}
    </section>
  )
}
