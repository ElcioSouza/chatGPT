import { ChatMenssage } from "@/types/chatmessage";
import { Configuration,OpenAIApi,ChatCompletionRequestMessage } from "openai";

// configurando
const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

// iniciar com os dados de configuração
const api = new OpenAIApi(config);

// processo de integração, manda historico e manda a mensagem de retorno com isso ChatCompletionRequestMessage
export const openai = {
    generate: async (messages: ChatCompletionRequestMessage[]) => {
        try {
        // recebendo a resposta
        const response = await api.createChatCompletion({
            model:'gpt-3.5-turbo',
            temperature: 0.6,
            messages
        })
        return response.data.choices[0]?.message?.content;
        } catch(error) {
            return undefined
        }
    },
    translateMessages: (messages: ChatMenssage[]) => {
       let reqMessages: ChatCompletionRequestMessage[] = [];
       
       for(let i in messages) {
            reqMessages.push({
                role: messages[i].author === 'me' ? 'user': 'assistant',
                content: messages[i].body
            })
       }
       return reqMessages;
    }
}
 