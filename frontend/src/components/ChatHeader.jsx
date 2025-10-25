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
        <div className="flex justify-between items-center bg-[var(--bg-secondary)] border-b border-[var(--border-color)] max-h-[84px] px-4 md:px-6 flex-1">
            <div className="flex items-center space-x-3">
                <div className={`avatar ${isOnline ? "online" : "offline"} `}>
                    <div className="w-10 md:w-12 rounded-full">
                        <img src={selectedUser.profilePic || "avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                <div>
                    <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base">{selectedUser.fullName}</h3>
                    <p className="text-[var(--text-secondary)] text-xs md:text-sm">{isOnline ? "Online" : "Offline"}</p>
                </div>
            </div>

            {/* Inline button for md+ */}
            <button onClick={() => setSelectedUser(null)} className="hidden sm:inline-flex relative z-30">
                <XIcon className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" />
            </button>

            {/* Fixed close button for small screens so it's always tappable */}
            <button onClick={() => setSelectedUser(null)} className="sm:hidden fixed pointer-events-auto" style={{ right: 12, top: 'calc(env(safe-area-inset-top, 0px) + 8px)', zIndex: 100 }}>
                <XIcon className="w-6 h-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" />
            </button>
        </div>
    )
}
export default ChatHeader;