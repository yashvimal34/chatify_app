import { Navigate, Route, Routes } from "react-router"
import ChatPage from "./pages/Chatpage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useStoreAuth"
import { useSettingsStore } from "./store/useSettingsStore"
import { useEffect } from "react"
import PageLoader from "./components/PageLoader"
import { Toaster } from "react-hot-toast"
import SettingsSidebar from "./components/SettingsSidebar";

function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { theme } = useSettingsStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  // Initialize theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="fixed top-0 -left-4 size-96 bg-pink-500 opacity-10 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 -right-4 size-96 bg-cyan-500 opacity-10 blur-[100px] pointer-events-none" />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>
      {authUser && <SettingsSidebar />}
      <Toaster />
    </div>
  )
}
export default App