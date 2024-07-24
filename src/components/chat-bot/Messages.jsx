import React, { useEffect, useRef } from "react";

export default function Messages({ messages }) {
    const el = useRef(null);
    useEffect(() => {
        if (messages) {
            el.current.scrollIntoView({ block: "end", behavior: "smooth" });
        }

    },[messages]);
    return (
        <div className="messages">
            {messages}
            <div id={"el"} ref={el} />
        </div>
    );
}
