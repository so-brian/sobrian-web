'use client';

import { useState } from "react";
import { SobrianOpenaiServiceClientImpl } from "../sobrian-openai-service";
import { Dialogue, Message } from "./models";
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';

// `app/openai/page.tsx` is the UI for the `/` URL
export default function Page() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dialogue] = useState({
        sessionId: uuidv4(), messages: []
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
            dialogue.messages.push({ from: 'bot', content: response, time: new Date() } as Message);
        } catch (error) {
            toast.error('error chating with the bot!');
        }
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col grow justify-between">
            <Toaster position="top-right" />
            <div className="flex flex-col">
                {dialogue.messages.map((message, index) =>
                    message.from === 'user' ?
                        <div key={index} className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <Image src="/user.svg" alt='' width={10} height={10} />
                                </div>
                            </div>
                            <div className="chat-header">
                                {message.from}
                                <time className="text-xs opacity-50"> {message.time.toLocaleTimeString()}</time>
                            </div>
                            <div className="chat-bubble chat-bubble-primary">{message.content}</div>
                            <div className="chat-footer opacity-50">
                                {dialogue.sessionId}
                            </div>
                        </div>
                        :
                        <div key={index} className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <Image src="/bot.svg" alt='' width={10} height={10} />
                                </div>
                            </div>
                            <div className="chat-header">
                                {message.from}
                                <time className="text-xs opacity-50"> {message.time.toLocaleTimeString()}</time>
                            </div>
                            <div className="chat-bubble chat-bubble-info">{message.content}</div>
                            <div className="chat-footer opacity-50">
                                {dialogue.sessionId}
                            </div>
                        </div>
                )}


                {
                    isLoading &&
                    <div className="flex justify-center">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                }
            </div>

            <div className="flex items-center">
                <div className="grow">
                    <textarea placeholder="Type to chat" className="textarea textarea-primary textarea-bordered textarea-lg w-full"
                        value={message} onChange={onMessageChange} onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                send();
                            }
                        }} />
                </div>
                <div className="flex-none">
                    <button className="btn btn-primary" onClick={send}>Send</button>
                </div>
            </div>
        </div>
    )
}

