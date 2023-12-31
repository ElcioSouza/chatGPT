import React from 'react'
import IconSunTwentyFour from './icons/iconsun24'

export default function ChatPlaceholder() {
  return (
    <div className="m-">
        <h3 className="text-4xl font-bold text-center my-8">ChatGPT</h3>
        <div className="flex flex-col md:flex-row gap-5 m-auto mb-8 md:max-w-4xl">
               <div>
                    <div className="flex justify-center items-center text-lg mb-3">
                        <IconSunTwentyFour width={24} height={24} className="mr-3" />
                        Exemplo
                    </div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">&quot;Explique o sentido da vida em termos simples&quot;</div>
               </div>
               <div>
                    <div className="flex justify-center items-center text-lg mb-3">
                        <IconSunTwentyFour width={24} height={24} className="mr-3" />
                        Exemplo
                    </div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">&quot;Explique o sentido da vida em termos simples&quot;</div>
               </div>
               <div>
                    <div className="flex justify-center items-center text-lg mb-3">
                        <IconSunTwentyFour width={24} height={24} className="mr-3" />
                        Exemplo
                    </div>
                    <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">&quot;Explique o sentido da vida em termos simples&quot;</div>
               </div>
        </div>
    </div>
  )
}
