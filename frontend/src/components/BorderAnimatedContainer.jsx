// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children }) {
    return (
        <div className="w-full h-full p-[1px] relative rounded-2xl overflow-hidden bg-[linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)]">
            <div className="absolute inset-[-1px] rounded-2xl bg-[conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))] animate-border" />
            <div className="relative w-full h-full rounded-2xl bg-[linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)] flex">
                {children}
            </div>
        </div>
    );
}
export default BorderAnimatedContainer;