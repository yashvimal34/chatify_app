import { useState } from "react";
import { useAuthStore } from "../store/useStoreAuth";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { LockIcon, MailIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { LoaderIcon } from "react-hot-toast";


function LoginPage() {

    const [formData, setFormData] = useState({ email: "", password: "" })
    const { login, isLoggingIn } = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault();

        login(formData);
    }

    return <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[var(--bg-primary)] overflow-hidden">
        <div className="relative w-full max-w-6xl h-[calc(100vh-3rem)]">
            <BorderAnimatedContainer>
                <div className="w-full flex flex-col md:flex-row h-full">
                    {/* Form Column which is in left side */}
                    <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-[var(--border-color)] h-full">
                        <div className="w-full max-w-md">
                            {/* Heading Text */}
                            <div className="text-center mb-8">
                                <MessageCircleIcon className="w-12 h-12 mx-auto text-[var(--text-secondary)] mb-4 text-white" />
                                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2 text-white">Welcome Back</h2>
                                <p className="text-white">Login to access your account</p>
                            </div>
                            {/* Form  */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input  */}
                                <div>
                                    <label className="auth-input-label"><span className="text-white">Email</span></label>
                                    <div className="relative">
                                        <MailIcon className="auth-input-icon" />

                                        <input type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input"
                                            placeholder="john@gmail.com"
                                        />

                                    </div>
                                </div>

                                {/* Password Input  */}
                                <div>
                                    <label className="auth-input-label"><span className="text-white">Password</span></label>
                                    <div className="relative">
                                        <LockIcon className="auth-input-icon" />

                                        <input type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="input"
                                            placeholder="Enter your password"
                                        />

                                    </div>
                                </div>

                                {/* Create Account Button */}
                                <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                                    {isLoggingIn ? (
                                        <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>

                            </form>

                            <div className="mt-6 text-center">
                                <Link to="/signup" className="auth-link">
                                    Don't have an account? SignUp
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* Image in Right Side */}
                    <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 h-full bg-[var(--bg-secondary)]">
                        <div>
                            <img
                                src="/login.png"
                                alt="People using mobile devices"
                                className="w-full h-auto object-contain"
                            />
                            <div className="mt-6 text-center">
                                <h3 className="text-xl font-medium text-[var(--accent-primary)]">Connect anytime and anywhere</h3>

                                <div className="mt-4 flex justify-center gap-4">
                                    <span className="auth-badge">Free</span>
                                    <span className="auth-badge">Easy Setup</span>
                                    <span className="auth-badge">Private</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BorderAnimatedContainer>

        </div>
    </div>;
}
export default LoginPage;