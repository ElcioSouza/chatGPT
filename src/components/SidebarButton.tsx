import React, { ReactNode } from 'react'

/* interface props {
  SidebarButton;
  carro: carro;
  dinheiro: dinheiro
}

type casa = {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}
type carro = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}
type SidebarButton = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}
interface TBens {
  carro: CarroType,
  props: props
}

type CarroType = {
  banco: string
} */

interface Props {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}


export default function SidebarButton({label, onClick, icon}:Props) {
  return (
    <div onClick={onClick} className="flex items-center rounded-md p-3 text-sm cursor-pointer
    hover:bg-gray-500/20">
        <div className="mr-3">{icon}</div>
        <div className="flex-1 truncate">{label}</div>
    </div>
  )
}
