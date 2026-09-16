import { useCartContext } from "../context/CartContext";
import { message } from "antd";

interface CartProps {
  onBuy: () => void;
}

function Cart({ onBuy }: CartProps) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartContext();

  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      message.success("Cart cleared successfully!");
    }
  }

  function handleRemoveItem(id: number) {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeFromCart(id);
      message.success("Item removed successfully!");
    }
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="help-support">
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to checkout</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Cart</h2>

      <div className="cart-summary">
        <p>Total Types of Products: {cart.length}</p>
        <p className="price">Cart Total: Nrs.{cartTotal}</p>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>

          <p className="price">Nrs.{item.price}</p>

          <div className="cart-actions">
            <button
              className="quantity-btn"
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>

            <span className="quantity">{item.quantity}</span>

            <button
              className="quantity-btn"
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>

            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-buttons">
        <button className="remove-btn" onClick={handleClearCart}>
          Clear Cart
        </button>

        <button className="buy-btn" onClick={onBuy}>
          Checkout All
        </button>
      </div>
    </div>
  );
}

export default Cart;
