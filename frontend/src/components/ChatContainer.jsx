import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useStoreAuth";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeloton from "./MessagesLoadingSkeloton";

function ChatContainer() {

    const { selectedUser, getMessageByUserId, messages, isMessagesLoading } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessageByUserId(selectedUser._id);
    }, [selectedUser, getMessageByUserId]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            <ChatHeader />
            <div className="flex-1 px-6 overflow-y-auto py-8">
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map(msg => (
                            <div key={msg._id} className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                                <div className={`chat-bubble relative ${msg.senderId === authUser._id
                                    ? "bg-cyan-500 text-white"
                                    : "bg-slate-800/50 text-slate-200"
                                    } ${msg.image ? "p-2" : ""}`}>
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="Shared"
                                            className="rounded-lg max-h-48 w-auto object-contain"
                                        />
                                    )}
                                    {msg.text && <p className={msg.image ? "mt-2" : ""}>{msg.text}</p>}
                                    <p className="text-[10px] opacity-70 text-right mt-1">
                                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                ) : isMessagesLoading ? <MessagesLoadingSkeloton /> : (
                    <NoChatHistoryPlaceholder name={selectedUser.fullName} />
                )}

            </div>
            <MessageInput />
        </>
    )
}
export default ChatContainer