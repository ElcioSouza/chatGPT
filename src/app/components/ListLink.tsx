import React, { useEffect, useState } from 'react'
interface Link {
  title: string;
  // outras propriedades dos links, se houver
}
export default function ListLink() {
  const [dataLink, setDataLink] = useState<Link[]>([]);
  useEffect(() => {
    const fetchLink = async () => {
      const dados = await fetch("http://localhost:3000/cadLink");
      const json = await dados.json();
      //console.log(json.data.links[0].url)
      if(json.data.links)
      setDataLink(json.data.links)
    }
    fetchLink();
}, []);

  return (
   <div>Link listagem
    titulo: {dataLink.map((item,index) =>(
      <div key={index}>
        {item.url}
      </div>
    ))}
   </div>
  )
}
