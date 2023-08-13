"use client";

import React from "react";
import IconLoad from "../../components/icons/iconload"

export default function Page() {
const [count,setCount] = React.useState(0);
const [num,setNum] = React.useState(0);

React.useEffect(() => {
    console.log('Contador:', count);
    console.log('Contado de 2 em 2:', num);
}, [count,num]);

const handleIncrement = () => {
    setCount(count + 1);
    setNum(num + 2)
  };
  return (
    <div>
      <IconLoad width={16} height={16}  className="animate-blink animate-blinkRotate"/>
      <h1>Contador: {count}</h1>
      <h1>Contado de 2 em 2: {num}</h1>
      <button onClick={handleIncrement} className="bg-blue-500 hover:bg-blue-700  text-white font-bold w-24 rounded flex items-center justify-center py-[0.75rem]">
        <span className="leading-[initial!importantn]">Incrementar</span>
        </button>
    </div>
  )
}