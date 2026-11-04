import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[#030712]/80 border-b border-slate-800 py-4">
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                <div className="text-xl font-bold tracking-wider text-cyan-400 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                    David Jared
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
                    <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                    <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
                    <Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link>
                    <Link href="/api/hello" target="_blank" className="hover:text-cyan-400 transition-colors">API</Link>
                </nav>
                <a
                    href="https://linkedin.com/in/davidjared123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon text-xs py-2 px-4"
                >
                    LinkedIn ↗
                </a>
            </div>
        </header>
    );
}