import { useEffect } from "react";
import { useAuthStore } from "../store/useStoreAuth";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeloton from "./MessagesLoadingSkeloton";

function ChatContainer() {

    const { selectedUser, getMessageByUserId, messages, isMessagesLoading } = useChatStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        getMessageByUserId(selectedUser._id);
    }, [selectedUser, getMessageByUserId]);

    return (
        <>
            <ChatHeader />
            <div className="flex-1 px-6 overflow-y-auto py-8">
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map(msg => (
                            <div key={msg._id} className={`chat ${msg.senderId === authUser.id ? "chat-end" : "chat-start"}`}>

                                <div className={`chat-bubble relative ${msg.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}`}>

                                    {msg.image && (
                                        <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                                    )}

                                    {msg.text && <p className="mt-2">{msg.text}</p>}
                                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                        {new Date(msg.createdAt).toISOString().slice(11, 16)};
                                    </p>

                                </div>

                            </div>
                        ))}
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