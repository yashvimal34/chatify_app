import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useStoreAuth";

function ChatHeader() {

    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id)


    useEffect(() => {

        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUser(null)
        }
        window.addEventListener("keydown", handleEscKey)

        // Cleanup the function.
        return () => window.removeEventListener("keydown", handleEscKey)
    }, [setSelectedUser]);

    return (
        <div className="fixed top-0 left-0 right-0 md:relative flex justify-between items-center bg-[var(--bg-secondary)] border-b border-[var(--border-color)] h-[60px] md:h-[70px] pt-safe px-4 md:px-6 z-40 touch-manipulation">
            <div className="flex items-center space-x-3">
                <div className={`avatar ${isOnline ? "online" : "offline"} `}>
                    <div className="w-10 md:w-12 rounded-full">
                        <img src={selectedUser.profilePic || "avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base truncate">{selectedUser.fullName}</h3>
                    <p className="text-[var(--text-secondary)] text-xs md:text-sm">{isOnline ? "Online" : "Offline"}</p>
                </div>
            </div>

            {/* Back button - visible on all screens */}
            <button
                onClick={() => setSelectedUser(null)}
                className="flex items-center justify-center w-12 h-12 -mr-2 rounded-full hover:bg-[var(--bg-hover)] active:bg-[var(--bg-active)] transition-colors touch-manipulation"
                aria-label="Back to chat list"
            >
                <XIcon className="w-6 h-6 text-[var(--text-secondary)] transition-colors" />
            </button>
        </div>
    )
}
export default ChatHeader;