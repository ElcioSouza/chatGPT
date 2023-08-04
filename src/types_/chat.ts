import { ChatMenssage } from "./chatmessage";

export interface Chat {
    id: String;
    title: string;
    messages: ChatMenssage[];
}