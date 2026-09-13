import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import { products } from "./data/products";
import { useCart } from "./hooks/useCart";
import type { CartItem } from "./types/product";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    removeSelectedFromCart,
  } = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleBuy(selectedIds: number[]) {
    if (selectedIds.length === 0) {
      return;
    }

    const selected = cart.filter((item) => selectedIds.includes(item.id));

    setSelectedProducts(selected);
    setShowCheckout(true);
    setOrderPlaced(false);
  }

  function handleOrderComplete() {
    const selectedIds = selectedProducts.map((item) => item.id);

    removeSelectedFromCart(selectedIds);

    setSelectedProducts([]);
    setShowCheckout(false);
    setOrderPlaced(true);
  }

  return (
    <div>
      <h1>Simple Shop</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Products</h2>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <Cart
        cart={cart}
        onRemove={removeFromCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onBuy={handleBuy}
      />

      {showCheckout && (
        <CheckoutForm
          products={selectedProducts}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {orderPlaced && (
        <div>
          <h2>Order Confirmed! 🎉</h2>
          <p>Thank you for your order.</p>
          <p>Your order has been placed successfully.</p>
        </div>
      )}
    </div>
  );
}

export default App;
