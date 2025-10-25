import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useStoreAuth";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {

    const { logout, authUser, updateProfile } = useAuthStore();
    const { isSoundEnabled, toggleSound } = useChatStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            const base64Image = reader.result
            setSelectedImg(base64Image)
            await updateProfile({ profilePic: base64Image })
        }
    }

    return (
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar online">
                        <button className="size-14 rounded-full overflow-hidden relative group" onClick={() => fileInputRef.current.click()}>
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="User Image"
                                className="size-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">Change</span>
                            </div>

                        </button>
                        <input type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                    </div>

                    {/* Username & oneline text */}
                    <div>
                        <h3 className="text-[var(--name-text)] font-medium text-sm md:text-base max-w-[180px] truncate">
                            {authUser.fullName}
                        </h3>

                        <p className="text-[var(--text-secondary)] text-xs">Online</p>

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex-gap-4 items-center">
                    {/* Logout Button */}
                    <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" onClick={logout}>
                        <LogOutIcon className="size-5" />
                    </button>

                    {/* Sound Toggel Button */}
                    {/* SOUND TOGGLE BTN */}
                    <button
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        onClick={() => {
                            // play click sound before toggling
                            mouseClickSound.currentTime = 0; // reset to start
                            mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                            toggleSound();
                        }}
                    >
                        {isSoundEnabled ? (
                            <Volume2Icon className="size-5" />
                        ) : (
                            <VolumeOffIcon className="size-5" />
                        )}
                    </button>
                </div>

            </div>
        </div>
    )
}
export default ProfileHeader;