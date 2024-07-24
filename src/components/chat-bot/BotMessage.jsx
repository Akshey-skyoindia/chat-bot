import React, { useState, useEffect } from "react";
import Image from 'next/image'

export default function BotMessage({ fetchMessage }) {
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadMessage() {
            const msg = await fetchMessage();
            setLoading(false);
            setMessage(msg);
        }
        loadMessage();
    }, [fetchMessage]);

    return (
        <div className="message-container">
            <div className="bot-message">
                {
                    isLoading ?
                        <Image
                            src="/icons-dots-loading.gif"
                            width={20}
                            height={20}
                            alt="loading" />
                        :
                        message
                }
            </div>
        </div>
    );
}
