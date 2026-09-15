import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

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

function AppContent() {
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

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
    navigate("/cart");
  }

  function handleBackToCart() {
    setShowCheckout(false);
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Home products={products} />} />
        <Route
          path="/cart"
          element={
            !showCheckout ? (
              <Cart onBuy={handleBuy} />
            ) : (
              <CheckoutForm
                products={selectedProducts}
                onOrderComplete={handleOrderComplete}
                onBack={handleBackToCart}
              />
            )
          }
        />
        <Route path="/help" element={<HelpSupport />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
