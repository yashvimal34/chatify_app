import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useStoreAuth";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: localStorage.getItem("activeTab") || "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => {
        localStorage.setItem("activeTab", tab);
        set({ activeTab: tab });
    },
    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            console.log("Chats Not Found", error)
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessageByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something Went Wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        const { authUser } = useAuthStore.getState()
        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        };

        // immediately updating the ui by adding the message
        set({ messages: [...messages, optimisticMessage] })

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: messages.concat(res.data) })
        } catch (error) {
            set({ messages: messages });
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    },
    // Append an incoming message (from socket) to the current conversation if it belongs to it
    appendMessage: (message) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;

        const partnerId = selectedUser._id?.toString();
        const senderId = message.senderId?.toString?.() || String(message.senderId);
        const receiverId = message.receiverId?.toString?.() || String(message.receiverId);

        if (senderId === partnerId || receiverId === partnerId) {
            set({ messages: [...messages, message] });
        }
    },
}));