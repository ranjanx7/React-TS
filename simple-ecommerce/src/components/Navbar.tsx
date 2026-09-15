import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { useCartContext } from "../context/CartContext";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { cart } = useCartContext();

  return (
    <nav className="navbar">
      <h2 className="navbar-logo" onClick={() => onNavigate("home")}>
        Daraz
      </h2>

      <div className="navbar-links">
        <button
          onClick={() => onNavigate("home")}
          className={currentPage === "home" ? "active" : ""}
        >
          <HomeOutlined />
        </button>

        <button
          onClick={() => onNavigate("products")}
          className={currentPage === "products" ? "active" : ""}
        >
          <ShopOutlined />
        </button>

        <button
          onClick={() => onNavigate("cart")}
          className={currentPage === "cart" ? "active" : ""}
        >
          <ShoppingCartOutlined />({cart.length})
        </button>

        <button
          onClick={() => onNavigate("help")}
          className={currentPage === "help" ? "active" : ""}
        >
          <QuestionCircleOutlined />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
