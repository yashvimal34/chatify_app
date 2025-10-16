// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children }) {
    return (
        <div className="w-full h-full relative rounded-2xl bg-[linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)] p-[2px] overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,transparent,theme(colors.cyan.400),transparent)] opacity-75 animate-border" />
            <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(0deg,transparent,theme(colors.cyan.400),transparent)] opacity-75 animate-border" style={{ animationDelay: '2s' }} />
            <div className="relative w-full h-full bg-[linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)] rounded-2xl flex overflow-hidden">
                {children}
            </div>
        </div>
    );
}
export default BorderAnimatedContainer;