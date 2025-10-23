import { useAuthStore } from "../store/useStoreAuth";

function Messages({ messages }) {
    const { authUser } = useAuthStore();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {messages.map(msg => (
                <div key={msg._id} className={`chat ${msg.senderId._id === authUser._id ? "chat-end" : "chat-start"}`}>
                    <div className="chat-header mb-1 text-xs text-slate-400">
                        {msg.senderId._id === authUser._id ? "You" : msg.senderId.fullName}
                    </div>
                    <div className="chat-image avatar">
                        <div className="w-6 rounded-full">
                            <img
                                src={msg.senderId.profilePic || "/avatar.png"}
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className={`chat-bubble relative ${msg.senderId._id === authUser._id
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
        </div>
    );
}

export default Messages;