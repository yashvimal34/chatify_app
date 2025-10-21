import ActiveTabSwitch from "../components/ActiveTabSwitch";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function ChatPage() {

    const { activeTab, selectedUser } = useChatStore();

    return (
        <div className="relative w-full max-w-6xl h-[660px]">
            <BorderAnimatedContainer>
                {/* LEFT SIDE */}
                <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
                    <ProfileHeader />
                    <ActiveTabSwitch />

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {activeTab === "chats" ? <ChatList /> : <ContactList />}

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
                    {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}

                </div>
            </BorderAnimatedContainer>
        </div>
    );
}
export default ChatPage;