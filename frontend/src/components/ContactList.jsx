import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useStoreAuth";


function ContactList() {

    const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);

    if (isUsersLoading) return <UsersLoadingSkeleton />

    return (
        <>
            {allContacts.map((contact) => (
                <div
                    key={contact._id}
                    className="bg-[var(--chat-bg)] p-4 rounded-lg cursor-pointer hover:bg-[var(--chat-hover)] transition-colors"
                    onClick={() => setSelectedUser(contact)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
                            <div className="size-12 rounded-full">
                                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
                            </div>
                        </div>
                        <h4 className="text-[var(--name-text)] font-medium truncate">{contact.fullName}</h4>
                    </div>
                </div>
            ))}
        </>
    )
}
export default ContactList