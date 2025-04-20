'use client';

import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, MessageSender } from './view_models';
import Image from 'next/image';
import { Position } from './view_models/position';
import { v4 as uuid } from 'uuid';

export default function Page () {

  let responseId: string | null = null;
  const dialogId = uuid();
  const emptyMessages: Message[] = [];
  const [messages, setMessages] = useState(emptyMessages);
  const [input, setInput] = useState('');

  async function sendMessage (text: string) {
    console.log('Sending message:', text);

    setInput('');
    setMessages((prevMessages) => {
      const newMessage = new Message(
        dialogId,
        new MessageSender('user', 'user', '/avatars/user.png'),
        input,
        new Date(),
      );
      return [...prevMessages, newMessage];
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, previousResponseId: responseId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();
      responseId = data.id;

      setMessages((prevMessages) => {
        const newMessage = new Message(
          dialogId,
          new MessageSender('ai', 'ai', '/avatars/ai.png'),
          data.outputText,
          new Date(),
        );
        return [...prevMessages, newMessage];
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  function onInputChanged (e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function onInputKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
    if (input.trim() === '') {
      return;
    }
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function onEnterClicked () {
    if (input.trim() === '') {
      return;
    }

    sendMessage(input);
  }


  return (
    <div className="flex flex-col h-screen">
      {/* Dialog History */}
      <div className="flex-grow bg-green-100 overflow-y-auto p-4">
        {/* Example messages */}
        {messages.map((message, index) => {
          return (
            <div key={index} className={`chat ${message.getPosition() === Position.END ? 'chat-end' : 'chat-start'} mb-2`}>
              <div className={`chat-image avatar ${message.getPosition() === Position.END ? 'ml-4' : 'mr-4'}`}>
                <div className="w-10 rounded-full">
                  <Image src={message.avatarUrl} alt="Avatar" width={50} height={50} />
                </div>
              </div>
              <div className={`chat-bubble ${message.getPosition() === Position.END ? 'bg-white text-black' : 'bg-blue-200 text-black'}`}>
                <Markdown remarkPlugins={[remarkGfm]}>
                  {message.text}
                </Markdown>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="flex items-center p-4 border-t border-base-300">
        <input
          type="text"
          value={input}
          onChange={onInputChanged}
          onKeyDown={onInputKeyDown}
          placeholder="Type your message..."
          className="input input-bordered flex-grow mr-2"
        />
        <button className="btn btn-primary" onClick={onEnterClicked}>Send</button>
      </div>
    </div>
  );
}