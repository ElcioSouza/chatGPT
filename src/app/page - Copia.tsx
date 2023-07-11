"use client";
import Footer from '@/components/Footer';
import ChatArea from '@/components/ChatArea';
import Header from '@/components/Header';
import { SideBar } from '@/components/Sidebar';
import { Chat } from '@/types/chat';
import { v4 as uuidv4} from 'uuid'
import React from 'react'
import SidebarChatButton from '@/components/SidebarChatButton';
import { openai } from '@/utils/openai';

export default function Page() {
const [sidebarOpened,setSidebarOpened] = React.useState(false);

/* const [chatActive, setChatActive]  = React.useState<Chat>({
  id: '1',
  title: 'Bla Blu',
  messages: [
    {id:'1', author: 'me', body: 'Opa, tudo bem?'},
    {id:'2', author: 'ai', body: 'Tudo Ótimo, em que posso te ajudar?'}
  ]
}); */
const [chatList, setChatList]  = React.useState<Chat[]>([]);
const [chatActiveId, setChatActiveId]  = React.useState<string>('');
const [chatActive, setChatActive]  = React.useState<Chat>();
const [AlLoading,SetAlLoading] = React.useState(false);

React.useEffect(() => {
      // sempre que chatlist for atualizado
      setChatActive(chatList.find(item => item.id === chatActiveId))
}, [chatActiveId,chatList]);

React.useEffect(() => {
  // sempre que chatlist for atualizado
  if(AlLoading) getAlResponse();
}, [AlLoading]);

// fazer minha requição da minha api 

/* simular a api*/
const getAlResponse = () => {

  setTimeout(() => {
      // Criei uma lista nova um clone
      let chatListClone = [...chatList];
      // busca chat que esta ativo
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
      if(chatIndex > -1) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: 'ai',
          body: 'Aqui vai a resposta da AI :)'
        });
      }
      setChatList(chatListClone);
      SetAlLoading(false);
    }, 2000)

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
       // quando minha AlLoading estiver carregando minha resposta não pode criar chat novo, dei um return
       if(AlLoading) return;
            //vai desabilita chat ativo
       setChatActiveId(''); 
       closeSidebar();
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
          setChatActiveId('')


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
          <SideBar
            open={sidebarOpened}
            close={closeSidebar}
            clear={handleClearConversatiosn}
            newChat={handleNewChat}>
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
          {/*   <button onClick={() => setSidebarOpened(true)}>Abrir SideBar</button> */}
          <Header 
            openSidebarClick={openSidebar}
            title={chatActive ? chatActive.title : 'ChatGPT'}
            newChatClick={handleNewChat}
          />
          {/* exibir conversa atual ou então não tem nenhuma conversa selecionada vai aparecer placeholder  */}
          <ChatArea chat={chatActive} loading={AlLoading}/>
          <button onClick={handleTestOpenAI}>Testar openAI</button>
          <Footer 
          sendMessage={handleSendMessage}
          disabled={AlLoading}
          />
          </section>
    </main>
  )
}