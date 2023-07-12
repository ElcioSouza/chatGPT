import React, { KeyboardEvent, useEffect } from 'react'
import IconSend from './icons/iconsend'

interface Props {
    disabled: boolean;
    sendMessage: (message: string) => void;
}
export default function ChatMessageInput({disabled, sendMessage}: Props) {
    const [text, setText]  = React.useState('');
    const textEl = React.useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
      if(textEl.current) {
        textEl.current.style.height = "0px";
        let scrollHeight = textEl.current.scrollHeight;
        textEl.current.style.height = scrollHeight + 'px'
      }
   },[text,textEl]);

    const handleTextKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
          if(event.code.toLowerCase() === 'enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
          }
    }

    const handleSendMessage = () => {
         if(!disabled && text.trim() !== '') {
            sendMessage(text);
            setText('')
         }
    }


  return (
    <div className={`flex border border-gray-800/50 bg-gpt-lighgray p-2 rounded-md
      ${disabled && 'opacity-50'}`}>

        <textarea
        ref={textEl} 
        className="flex-1 border-0 bg-transparent resize-none 
        outline-none h-7 max-h-48 ouverflow-y-auto"
        placeholder="Digite uma mensagem"
        value={text}
        onChange={e => setText(e.target.value)} 
        onKeyUp={handleTextKeyUp}
        disabled={disabled}></textarea>
        
        {/* icone de envio */}
        <div onClick={handleSendMessage} className={`self-end p-1 cursor-pointer rounded
        ${text.length ? 'opacity-100 hover:bg-black/20': 'opacity-20'}`}>
            <IconSend width={14}  height={14}/>
        </div>
    </div>
  )
}
