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
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);
    const [dialogue, setDialogue] = useState({
        sessionId: uuidv4(), messages: [
            { from: 'bot', content: 'Hello, I am Sobrian. I am a chatbot. I am here to help you with your sobriety.', time: new Date() } as Message,
            { from: 'user', content: 'I am struggling with alcohol.', time: new Date() } as Message,
        ]
    } as Dialogue);
    const client = new SobrianOpenaiServiceClientImpl(dialogue.sessionId);

    function onMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value);
        setIsButtonEnabled(message.length > 0);
    }

    async function send() {
        dialogue.messages.push({ from: 'user', content: message, time: new Date() } as Message);
        try {
            const response = await client.chat(message);
            console.log('the response is: ', response);
            dialogue.messages.push({ from: 'bot', content: response, time: new Date() } as Message);
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex-col">
            <div className="flex items-center">
                <div className="grow">
                    <textarea placeholder="Bio" className="textarea textarea-accent textarea-bordered textarea-lg w-full" value={message} onChange={onMessageChange}></textarea>
                </div>
                <div className="flex-none">
                    <button className="btn btn-accent" onClick={send}>Send</button>
                </div>
            </div>
            {dialogue.messages.map((message, index) =>
                <div key={index} className="flex items-center">
                    <div className="flex-none">
                        <Image alt='' src={message.from === 'user' ? '/user.svg' : '/bot.svg'} className="avatar avatar-xl" width={100} height={100}
                        />
                    </div>
                    <div className="flex-grow">
                        <div className="card">
                            <div className="card-body">
                                {message.content}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

