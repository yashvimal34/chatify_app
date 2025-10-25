import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore();

    return (
        <div className="tabs tabs-boxed bg-transparent p-1 m-1 md:p-2 md:m-2">
            <button
                onClick={() => setActiveTab("chats")}
                className={`tab transition-all duration-200 ${activeTab === "chats"
                    ? "bg-cyan-500/20 text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-cyan-500/10 hover:text-[var(--text-primary)]"
                    }`}
            >
                Chats
            </button>

            <button
                onClick={() => setActiveTab("contacts")}
                className={`tab transition-all duration-200 ${activeTab === "contacts"
                    ? "bg-cyan-500/20 text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-cyan-500/10 hover:text-[var(--text-primary)]"
                    }`}
            >
                Contacts
            </button>
        </div>
    );
}
export default ActiveTabSwitch;