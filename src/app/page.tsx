"use client";

import Footer from '@/components/Footer';
import ChatArea from '@/components/ChatArea';
import Header from '@/components/Header';
import { SideBar } from '@/components/Sidebar';
import { Chat } from '@/types/chat';
import { v4 as uuidv4} from 'uuid'
import React, { use } from 'react'
import SidebarChatButton from '@/components/SidebarChatButton';
import { openai } from '@/utils/openai';
import { GraphQLClient } from 'graphql-request';
import GqlClient from '../graphql/apollo-client';
import { gql } from '@apollo/client';
import ListLink from '@/app/components/ListLink';
import { useRouter } from "next/navigation";
export default function Page() {

const [sidebarOpened,setSidebarOpened] = React.useState(false);
const [chatList, setChatList]  = React.useState<Chat[]>([]);
const [chatActiveId, setChatActiveId]  = React.useState<string>('');
const [chatActive, setChatActive]  = React.useState<Chat>();
const [AlLoading,SetAlLoading] = React.useState(false);
const [chatData,setChatData] = React.useState('');
const router = useRouter();
/* const [dataLink, setDataLink] = React.useState([]);
React.useEffect(() => {
    const fetchLink = async () => {
      const dados = await fetch("http://localhost:3000/cadLink");
      const json = await dados.json();
      //console.log(json.data.links[0].url)
      setDataLink(json.data.links)
    }
    fetchLink();
}, []);

 console.log(dataLink) */


/* React.useEffect(() => {
    const fetchLink = async() => {
      const dados = await fetch("./cadLink");
      const json = dados.json();
      return json;
    }
    console.log(fetchLink())
}, [dataLink]) */


React.useEffect(() => {
      // sempre que chatlist for atualizado
      setChatActive(chatList.find(item => item.id === chatActiveId))
}, [chatActiveId,chatList]);

React.useEffect(() => {
  // sempre que chatlist for atualizado
  if(AlLoading) getAlResponse();
  
}, [AlLoading]);

// fazer minha requição da minha api 

const getAlResponse = async () => {
    // Criei uma lista nova um clone
    let chatListClone = [...chatList];
    // busca chat que esta ativo
    let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
    // se esta ativo o chat
    if(chatIndex > -1) {
        // pegar as mensagem e traduzir ela para manda elas meu generation
        const translated = openai.translateMessages(chatListClone[chatIndex].messages);      
        const response = await openai.generate(translated);
       
        if(response) {
          chatListClone[chatIndex].messages.push({
            id: uuidv4(),
            author: 'ai',
            body: response
          });
        } 
    }
    setChatList(chatListClone);
    SetAlLoading(false);
}

const openSidebar = () => setSidebarOpened(true);
const closeSidebar = () => setSidebarOpened(false);
// limpa toda a lista e vai para tela inicial a tela que mostra placeholder do chat
const handleClearConversatiosn = () => {
         // quando minha AlLoading estiver carregando não vai fazer nada proximas linha
         if(AlLoading) return;

         // desabilito a conversa atual
         setChatActiveId('');
         // limpa a conversa atual
         setChatList([]);
}
// quando envia uma mensagem que vai criar novo chat
const handleSendMessage = (message: string) => {
     // quando nao tiver preenchido vai criar novo chat, ja com mensagem que esta mandando
     if(!chatActiveId) {
        // Criar novo chat
        let newChatId = uuidv4();
        setChatList([{
          id: newChatId,
          title: message,
          messages: [
            {
              id: uuidv4(),
              author: 'me',
              body: message
            }
          ]
        }, ...chatList]);
        setChatActiveId(newChatId);

      } else {
        // Atualizar chat existente.
        let chatListClone = [...chatList] // criei uma lista nova um clone
        console.log("entrou",chatListClone)
        // indentificar o index se esta ativo, e armazenando na variavel chatIndex
        let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)

        // acessando a mensagem naquele chat especifico, e criando uma nova menssagem com push
        chatListClone[chatIndex].messages.push({
            id: uuidv4(),
            author: 'me',
            body: message
        })
        // atualizando toda minha lista de chat
       setChatList(chatListClone);
     }
     SetAlLoading(true)
  }

// sempre usuario clicar novo chat, vai desabilita chat ativo
const handleNewChat = () => {
       // quando minha AlLoading estiver carregando minha resposta não pode criar chat novo
       if(AlLoading) return;
      //vai desabilita chat ativo
       setChatActiveId(''); 
       closeSidebar();
  }
  function getCookieData(name:String) {
    const cookieString = decodeURIComponent(document.cookie);
    const cookieArray = cookieString.split(';');
  
    for (const cookie of cookieArray) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue.trim();
      }
    }
  
    return null; // Return null if the cookie is not found
  }
  function deleteCookie(cookieName:string) {
    document.cookie =  `token=${cookieName}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    router.push("/login")
  }
  const handlesignOutChat = () => {
          // console.log(AlLoading)
           // quando minha AlLoading estiver carregando minha resposta não pode signOutChat
         //  if(AlLoading) return;
          
             const token = getCookieData("token")
           
           if(token) {
            console.log(token)
            deleteCookie(token);
           }
  }
  // troca de chats
  const handleSelectChat = (id: string) => {
      // quando minha AlLoading estiver carregando não vai fazer nada proximas linha
      if(AlLoading) return;  

      // vamos trocar de chat

      // vou pega index se chat esta ativo
      let item = chatList.find(item => item.id === id);

      if(item) {
        setChatActiveId(item.id.toString())
      }
      closeSidebar()
  }
    const handleDeleteChat = (id: string) => {
          // preciso clonar
          let chatListClone = [...chatList];
          // encontrei se esta ativo
          let chatIndex = chatListClone.findIndex(item => item.id === id);
          // removendo o ativo da lista
          chatListClone.splice(chatIndex, 1);
          setChatList(chatListClone);
          //vai zerar como era antes
          setChatActiveId('');
    }
    const handleEditChat = (id: string, newTitle: string) => {
          // preciso clonar
          let chatListClone = [...chatList];
          // encontrei se esta ativo
          let chatIndex = chatListClone.findIndex(item => item.id === id);
          // removendo o ativo da lista
          chatListClone[chatIndex].title = newTitle;
          setChatList(chatListClone);
    }
  
  const handleTestOpenAI = async () => {
        await openai.generate([
          {
            role:'user',
            content: 'Qual a capital do Brasil?'
          }
        ])
  }

  return (
    <main className="flex min-h-screen bg-gpt-gray">
           {/* <ListLink />  */}
           {/* menu */}
          <SideBar
            open={sidebarOpened}
            close={closeSidebar}
            clear={handleClearConversatiosn}
            newChat={handleNewChat}
            signOut={handlesignOutChat}
            >
            {/* <div className="w-16 h-96 mb-2">...</div> */}

            {chatList.map((item,index)=> (
              <SidebarChatButton 
               key={index}
               chatItem={item}
               active={item.id === chatActiveId}
               click={handleSelectChat}
               del={handleDeleteChat}
               edit={handleEditChat}
              />
            ))}
          </SideBar>
          <section className="flex flex-col w-full">
            
          <Header 
            openSidebarClick={openSidebar}
            title={chatActive ? chatActive.title : 'ChatGPT'}
            newChatClick={handleNewChat}
          />
          {/* exibir conversa atual ou então não tem nenhuma conversa selecionada vai aparecer placeholder  */}
          <ChatArea chat={chatActive} loading={AlLoading}/>
         {/*  <button onClick={handleTestOpenAI}>Testar openAI</button> */}
          <Footer 
          sendMessage={handleSendMessage}
          disabled={AlLoading}
          />
          </section>
    </main>
  )
}