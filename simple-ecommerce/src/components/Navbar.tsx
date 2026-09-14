interface NavbarProps {
  onNavigate: (page: string) => void;
}

function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <h2>Daraz</h2>

      <div className="navbar-links">
        <button onClick={() => onNavigate("home")}>Home</button>

        <button onClick={() => onNavigate("cart")}>Cart</button>

        <button onClick={() => onNavigate("help")}>Help & Support</button>
      </div>
    </nav>
  );
}

export default Navbar;
