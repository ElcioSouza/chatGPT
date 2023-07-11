import { Configuration,OpenAIApi,ChatCompletionRequestMessage } from "openai";

// configurando
const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

// iniciar com os dados de configuração
const api = new OpenAIApi(config);

// processo de integração, manda historico e manda a mensagem de retorno com isso ChatCompletionRequestMessage
export const openai = {
    generate: async (messages: ChatCompletionRequestMessage) => {
        // recebendo a resposta
        const response = await api.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.6,
            messages: [
                {
                    role: 'user', // user, assistant,system que esta mandando a mensagem
                    content: 'Oi, tudo bem?' // mensagem
                },
                {
                    role: 'assistant',
                    content: 'Tudo, em que posso te ajudar?'
                }
            ]
        })
    }
}