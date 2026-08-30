export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <a href="/" className="text-xl font-bold">
          🎓 CollegeFinder
        </a>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <a href="/colleges" className="hover:text-blue-600">
            Colleges
          </a>

          <a href="/compare" className="hover:text-blue-600">
            Compare
          </a>

          <a href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            Login
          </a>
        </div>

      </div>
    </nav>
  );
}