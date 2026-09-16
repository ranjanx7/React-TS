import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Home from "./components/HomeProduct";
import Cart from "./components/Cart";
import HelpSupport from "./components/HelpSupport";
import CheckoutForm from "./components/CheckoutForm";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

import { CartProvider, useCartContext } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

import "./App.css";

function AppContent() {
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const { cart, clearCart } = useCartContext();

  function handleBuy() {
    if (cart.length === 0) {
      return;
    }
    setShowCheckout(true);
  }

  function handleOrderComplete() {
    clearCart();
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
        <Route path="/products" element={<Home />} />
        <Route
          path="/cart"
          element={
            !showCheckout ? (
              <Cart onBuy={handleBuy} />
            ) : (
              <CheckoutForm
                products={cart}
                onOrderComplete={handleOrderComplete}
                onBack={handleBackToCart}
              />
            )
          }
        />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
