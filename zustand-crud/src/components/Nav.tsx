const Navbar = () => {
  return (
    <nav className="w-full bg-[#ecebeb] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-blue-600 no-underline">
          User Management
        </a>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
