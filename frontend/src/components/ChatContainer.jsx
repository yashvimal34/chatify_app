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
        <div className="flex flex-col h-screen">
            <ChatHeader />
            <div className="flex-1 px-6 overflow-y-auto py-4 bg-[var(--bg-primary)]">
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className="max-w-6xl w-full mx-auto space-y-6">
                        {messages.map(msg => (
                            <div key={msg._id} className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                                <div className={`chat-bubble relative ${msg.senderId === authUser._id
                                    ? "bg-[var(--accent-primary)] text-white"
                                    : "bg-[var(--message-received-bg)] text-[var(--message-received-text)] shadow-sm border border-[var(--border-color)]"
                                    } ${msg.image ? "p-2" : ""}`}>
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="Shared"
                                            className="rounded-lg max-h-48 w-auto object-contain border border-[var(--border-color)]"
                                        />
                                    )}
                                    {msg.text && <p className={msg.image ? "mt-2" : ""}>{msg.text}</p>}
                                    <p className={`text-[10px] mt-1 text-right ${msg.senderId === authUser._id
                                        ? "text-white/70"
                                        : "text-[var(--text-secondary)]"}`}>
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
        </div>
    )
}
export default ChatContainer