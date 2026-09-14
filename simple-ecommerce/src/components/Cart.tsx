import { useState } from "react";
import { useCartContext } from "../context/CartContext";

interface CartProps {
  onBuy: (selectedIds: number[]) => void;
}

function Cart({ onBuy }: CartProps) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    removeSelectedFromCart,
  } = useCartContext();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  function handleSelect(id: number) {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((selectedId) => selectedId !== id);
      }

      return [...currentIds, id];
    });
  }

  function handleDeleteSelected() {
    if (
      window.confirm("Are you sure you want to remove these selected items?")
    ) {
      removeSelectedFromCart(selectedIds);
      setSelectedIds([]);
      setTimeout(() => {
        alert("Selected items removed successfully!");
      }, 1000);
    }
  }

  function handleRemoveItem(id: number) {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeFromCart(id);
      setTimeout(() => {
        alert("Item removed successfully!");
      }, 1000);
    }
  }

  const selectedItems = cart.filter((item) => selectedIds.includes(item.id));
  const selectedTotal = selectedItems.reduce(
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
        {selectedIds.length > 0 && (
          <p className="price">Selected Total: Nrs.{selectedTotal}</p>
        )}
      </div>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => handleSelect(item.id)}
          />

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
        <button
          className="remove-btn"
          disabled={selectedIds.length === 0}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>

        <button
          className="buy-btn"
          disabled={selectedIds.length === 0}
          onClick={() => onBuy(selectedIds)}
        >
          Buy Selected
        </button>
      </div>
    </div>
  );
}

export default Cart;
