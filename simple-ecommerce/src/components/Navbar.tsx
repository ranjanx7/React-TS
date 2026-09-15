import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import { useCartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useCartContext();
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Daraz
      </Link>

      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          <HomeOutlined />
        </Link>

        <Link
          to="/products"
          className={location.pathname === "/products" ? "active" : ""}
        >
          <ShopOutlined />
        </Link>

        <Link
          to="/cart"
          className={location.pathname === "/cart" ? "active" : ""}
        >
          <ShoppingCartOutlined />({cart.length})
        </Link>

        <Link
          to="/help"
          className={location.pathname === "/help" ? "active" : ""}
        >
          <QuestionCircleOutlined />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
