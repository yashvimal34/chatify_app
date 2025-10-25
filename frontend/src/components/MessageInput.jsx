import { useState, useRef } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, XIcon, SendIcon } from "lucide-react";

function MessageInput() {
    const { playRandomKeyStrokeSound } = useKeyboardSound();
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    const { sendMessage, isSoundEnabled } = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!text.trim() && !imagePreview) return;
        if (isSoundEnabled) playRandomKeyStrokeSound()

        sendMessage({
            text: text.trim(),
            image: imagePreview
        });

        setText("")
        setImagePreview("")

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please Select an Image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    return (
        <div className="fixed bottom-0 left-0 right-0 sm:relative p-4 border-t border-[var(--border-color)] z-50 bg-[var(--bg-primary)]" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-[var(--border-color)]"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                <input type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        isSoundEnabled && playRandomKeyStrokeSound()
                    }}
                    className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg py-2 px-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] w-full"
                    placeholder="Type Your Message..."
                />

                <input type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                <div className="flex gap-2 sm:gap-4 z-50">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg px-4 transition-colors ${imagePreview ? "text-[var(--accent-primary)]" : ""}`}
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>

                    <button
                        type="submit"
                        disabled={!text.trim() && !imagePreview}
                        className="bg-[var(--accent-primary)] text-white rounded-lg px-4 py-2 font-medium hover:bg-[var(--accent-secondary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div >
    )
}
export default MessageInput;