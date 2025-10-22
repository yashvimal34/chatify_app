import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
    const { activeTab, setActiveTab } = useChatStore();

    return (
        <div className="tabs tabs-boxed bg-transparent p-2 m-2">
            <button
                onClick={() => setActiveTab("chats")}
                className={`tab transition-all duration-200 hover:text-cyan-400 ${activeTab === "chats"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-slate-400 hover:bg-cyan-500/10"
                    }`}
            >
                Chats
            </button>

            <button
                onClick={() => setActiveTab("contacts")}
                className={`tab transition-all duration-200 hover:text-cyan-400 ${activeTab === "contacts"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-slate-400 hover:bg-cyan-500/10"
                    }`}
            >
                Contacts
            </button>
        </div>
    );
}
export default ActiveTabSwitch;