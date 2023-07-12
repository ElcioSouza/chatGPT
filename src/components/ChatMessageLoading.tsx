import React from 'react'
import IconRobot from './icons/iconrobot'

export default function ChatMessageLoading() {
  return (
    
    <div className="py-5 px-5 bg-gray-600/50">
         {/* quando envia vai carregar icone de robo e o retango piscando  */}
         {/* icone antes de enviar do robo */}
        <div className="max-w-4xl m-auto flex items-center">
            <div className="w-10 h-10 flex items-center mx-4 
            rounded bg-green-900 md:ml-0">
                <IconRobot width={24} height={24} />
            </div>
             {/* animação do retangulo piscando */}
            <div className="flex-1 text-base whitespace-pre-wrap">
                <div className="w-2 h-4 bg-slate-300 animate-blink"></div>
            </div>
        </div>   
    </div>
  )
}
