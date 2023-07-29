'use client';
var message = "Hello World";

// `app/openai/page.tsx` is the UI for the `/` URL
export default function Page() {
    return (
        <div className="flex items-center">
            <div className="grow">
                <textarea placeholder="Bio" className="textarea textarea-accent textarea-bordered textarea-lg w-full" onChange={onMessageChange}></textarea>
            </div>
            <div className="flex-none">
                <button className="btn btn-accent" onClick={() => Send()}>Send</button>
            </div>
        </div>
    )
}

function onMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    message = e.target.value;
}

function Send() {
    console.log("Send: " + message);
}