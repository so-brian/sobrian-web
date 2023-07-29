'use client';

import { useState } from "react";
import { SobrianOpenaiServiceClientImpl } from "../sobrian-openai-service";
import { Dialogue, Message } from "./models";
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

// `app/openai/page.tsx` is the UI for the `/` URL
export default function Page() {
    console.log('rendering page');
    const [message, setMessage] = useState("Hello, world!");
    const [isLoading, setIsLoading] = useState(true);
    const [dialogue] = useState({
        sessionId: uuidv4(), messages: [
            { from: 'bot', content: 'Hello, I am Sobrian. I am a chatbot. I am here to help you with your sobriety.', time: new Date() } as Message,
            { from: 'user', content: 'I am struggling with alcohol.', time: new Date() } as Message,
        ]
    } as Dialogue);
    const client = new SobrianOpenaiServiceClientImpl(dialogue.sessionId);

    function onMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value);
    }

    async function send() {
        setIsLoading(true);
        setMessage('');
        dialogue.messages.push({ from: 'user', content: message, time: new Date() } as Message);
        try {
            const response = await client.chat(message);
            console.log('the response is: ', response);
            dialogue.messages.push({ from: 'bot', content: response, time: new Date() } as Message);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    return (
        <div className="flex-col">


            {dialogue.messages.map((message) =>
                message.from === 'user' ?
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <Image src="/user.svg" alt='' width={10} height={10} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {message.from}
                            <time className="text-xs opacity-50"> {message.time.toLocaleTimeString()}</time>
                        </div>
                        <div className="chat-bubble">{message.content}</div>
                    </div>
                    :
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <Image src="/bot.svg" alt='' width={10} height={10} />
                            </div>
                        </div>
                        <div className="chat-header">
                            {message.from}
                            <time className="text-xs opacity-50"> {message.time.toLocaleTimeString()}</time>
                        </div>
                        <div className="chat-bubble">{message.content}</div>
                    </div>
            )}


            {
                isLoading &&
                <div className="flex justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            }

            <div className="flex items-center">
                <div className="grow">
                    <textarea placeholder="Bio" className="textarea textarea-accent textarea-bordered textarea-lg w-full" value={message} onChange={onMessageChange}></textarea>
                </div>
                <div className="flex-none">
                    <button className="btn btn-accent" onClick={send}>Send</button>
                </div>
            </div>
        </div>
    )
}

