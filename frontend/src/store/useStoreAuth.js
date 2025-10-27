import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import io from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : window.location.origin;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck:", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // Inside signup:
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            // Save token before connecting socket
            if (res.data.token) {
                localStorage.setItem("jwt", res.data.token);
            }

            toast.success("Account Created Successfully!");

            // Now connect socket after token exists
            get().connectSocket();

        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            set({ isSigningUp: false });
        }
    },

    // Inside login:
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            // Save token before socket connection
            if (res.data.token) {
                localStorage.setItem("jwt", res.data.token);
            }

            toast.success("Logged in Successfully");

            // Connect after token exists
            get().connectSocket();

        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            localStorage.removeItem('jwt'); // Remove token on logout
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error("Error in logging out");
            console.log("Logout error:", error);
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.error("Error in update profile:", error); // ← actual error
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message);
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        // Get token from localStorage instead of cookies
        const token = localStorage.getItem('jwt');

        if (!token) {
            console.log("No token found in localStorage");
            return;
        }

        const socket = io(BASE_URL, {
            withCredentials: true,
            auth: {
                token: token
            },
            autoConnect: false
        });

        // Handle connection errors
        socket.on("connect_error", (error) => {
            console.log("Socket connection error:", error.message);
            toast.error("Connection error: " + error.message);
        });

        socket.connect();

        // Handle successful connection
        socket.on("connect", () => {
            console.log("Socket connected successfully");
            set({ socket });

            // Ensure we don't register duplicate listeners
            socket.off("newMessage");

            // Listen for real-time incoming messages and forward to chat store
            socket.on("newMessage", (message) => {
                console.log("Received newMessage via socket:", message);
                try {
                    // Append message to chat store so UI updates
                    useChatStore.getState().appendMessage(message);

                    // Play notification sound if enabled and the message is not from current user
                    const isSoundEnabled = useChatStore.getState().isSoundEnabled;
                    const { authUser } = get();
                    const senderId = String(message.senderId || "");
                    const myId = authUser?._id ? String(authUser._id) : null;

                    if (isSoundEnabled && myId && senderId !== myId) {
                        try {
                            const audio = new Audio("/sounds/notification.mp3");
                            // some browsers require promise handling for play()
                            const playPromise = audio.play();
                            if (playPromise && typeof playPromise.then === "function") {
                                playPromise.catch((e) => {
                                    // ignore play errors (autoplay policy, etc.)
                                    console.debug("Notification sound play error:", e.message || e);
                                });
                            }
                        } catch (e) {
                            console.debug("Could not play notification sound:", e.message || e);
                        }
                    }
                } catch (err) {
                    console.error("Error handling incoming message:", err);
                }
            });
        });

        // listen for online user events
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        }
    },
}));