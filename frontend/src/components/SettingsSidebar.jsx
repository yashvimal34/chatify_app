import { useSettingsStore } from "../store/useSettingsStore";
import { IoClose } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaSun, FaMoon } from "react-icons/fa";
import { BsCircleHalf } from "react-icons/bs";

const SettingsSidebar = () => {
    const { theme, setTheme, isSettingsOpen, toggleSettings, closeSettings } = useSettingsStore();

    const themes = [
        { id: "default", name: "Default", icon: BsCircleHalf },
        { id: "light", name: "Light", icon: FaSun },
        { id: "dark", name: "Dark", icon: FaMoon },
    ];

    return (
        <>
            {/* Settings Sidebar */}
            <div
                className={`fixed right-0 top-0 z-40 h-full w-80 bg-[var(--bg-secondary)] shadow-lg transition-transform duration-300 ${isSettingsOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h2>
                        <button
                            onClick={closeSettings}
                            className="text-[var(--text-primary)] hover:text-[var(--text-secondary)]"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Theme Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Theme</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {themes.map(({ id, name, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setTheme(id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${theme === id
                                        ? "border-cyan-500 bg-cyan-500/10"
                                        : "border-transparent hover:border-cyan-500/50"
                                        }`}
                                >
                                    <Icon
                                        size={24}
                                        className={`mb-2 ${theme === id ? "text-cyan-500" : "text-[var(--text-primary)]"
                                            }`}
                                    />
                                    <span className="text-sm text-[var(--text-primary)]">{name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isSettingsOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50"
                    onClick={closeSettings}
                />
            )}
        </>
    );
};

export default SettingsSidebar;