import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function sendMessage () {
  // Handle sending message logic here
  console.log('Message sent');
}

export default function Page () {
  return (
    <div className="flex flex-col h-screen">
      {/* Dialog History */}
      <div className="flex-grow bg-green-100 overflow-y-auto p-4">
        {/* Example messages */}
        <div className="chat chat-end mb-2">
          <div className="chat-image avatar ml-4">
            <div className="w-10 rounded-full">
              <img src="/path/to/user-avatar.png" alt="User Avatar" />
            </div>
          </div>
          <div className="chat-bubble chat-bubble-info">Hello</div>
        </div>
        <div className="chat chat-start mb-2">
          <div className="chat-image avatar mr-4">
            <div className="w-10 rounded-full">
              <img src="/path/to/ai-avatar.png" alt="AI Avatar" />
            </div>
          </div>
          <div className="chat-bubble bg-blue-200 text-black">
            <Markdown>
              {`Hi there! Here is some **bold text** and a [link](https://example.com).`}
            </Markdown>
          </div>
        </div>
        <div className="chat chat-end mb-2">
          <div className="chat-image avatar ml-4">
            <div className="w-10 rounded-full">
              <img src="/path/to/user-avatar.png" alt="User Avatar" />
            </div>
          </div>
          <div className="chat-bubble bg-white text-black">Can you show me an example?</div>
        </div>
        <div className="chat chat-start mb-2">
          <div className="chat-image avatar mr-4">
            <div className="w-10 rounded-full">
              <img src="/path/to/ai-avatar.png" alt="AI Avatar" />
            </div>
          </div>
          <div className="chat-bubble bg-blue-200 text-black">
            <Markdown remarkPlugins={[remarkGfm]}>
              {`A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

[Duck Duck Go](https://duckduckgo.com)

* Lists
* [ ] todo
* [x] done

# Heading 1

## Heading 2

\`\`\`javascript
console.log("Hello, world!");
\`\`\`

\`\`\`python
print("Hello, world!")
\`\`\`


A table:

| a | b |
| - | - |
| 1111111111111111111111 | 2 |
`}
            </Markdown>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center p-4 border-t border-base-300">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered flex-grow mr-2"
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}