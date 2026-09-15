import { useState } from "react";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Home from "./components/HomeProduct";
import Cart from "./components/Cart";
import HelpSupport from "./components/HelpSupport";
import CheckoutForm from "./components/CheckoutForm";
import Footer from "./components/Footer";

import { products } from "./data/products";
import { useCartContext } from "./context/CartContext";
import type { CartItem } from "./types/product";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const { cart, removeSelectedFromCart } = useCartContext();

  function handleBuy(selectedIds: number[]) {
    if (selectedIds.length === 0) {
      return;
    }

    const selected = cart.filter((item) => selectedIds.includes(item.id));

    setSelectedProducts(selected);
    setShowCheckout(true);
  }

  function handleOrderComplete() {
    const selectedIds = selectedProducts.map((item) => item.id);

    removeSelectedFromCart(selectedIds);

    setSelectedProducts([]);
    setShowCheckout(false);

    alert("Your order has been placed successfully.");
  }

  function handleBackToCart() {
    setShowCheckout(false);
  }

  return (
    <div>
      <Navbar onNavigate={setPage} currentPage={page} />
      {page === "home" && <LandingPage onNavigate={setPage} />}
      {page === "products" && <Home products={products} />}
      {page === "cart" && !showCheckout && <Cart onBuy={handleBuy} />}
      {page === "cart" && showCheckout && (
        <CheckoutForm
          products={selectedProducts}
          onOrderComplete={handleOrderComplete}
          onBack={handleBackToCart}
        />
      )}
      {page === "help" && <HelpSupport />}
      <Footer />
    </div>
  );
}

export default App;
