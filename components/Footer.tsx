export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-[#030712] py-8 mt-20 text-slate-500 text-sm">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>&copy; 2026 David Jared Pérez. All rights reserved.</p>
                <div className="flex gap-6 text-slate-400">
                    <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
                    <a href="/about" className="hover:text-cyan-400 transition-colors">About</a>
                </div>
            </div>
        </footer>
    );
}