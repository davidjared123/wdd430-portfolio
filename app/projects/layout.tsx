import Link from "next/link";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Projects Section</h2>
      <nav className="mb-6 pb-4 border-b border-gray-200 flex gap-4 text-blue-600 font-medium">
        <Link href="/projects" className="hover:underline">
          Overview
        </Link>
        <span>|</span>
        <Link href="/projects/opensource" className="hover:underline">
          Open Source
        </Link>
        <span>|</span>
        <Link href="/projects/school" className="hover:underline">
          School
        </Link>
      </nav>
      {children}
    </section>
  );
}
