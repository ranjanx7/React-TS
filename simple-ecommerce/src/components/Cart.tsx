import { useState } from "react";
import type { CartItem } from "../types/product";

interface CartProps {
  cart: CartItem[];
  onRemove: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onBuy: (selectedIds: number[]) => void;
}

function Cart({ cart, onRemove, onIncrease, onDecrease, onBuy }: CartProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  function handleSelect(id: number) {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((selectedId) => selectedId !== id);
      }

      return [...currentIds, id];
    });
  }

  if (cart.length === 0) {
    return (
      <div>
        <h2>Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => handleSelect(item.id)}
          />

          <h3>{item.name}</h3>

          <p>Price: Nrs.{item.price}</p>

          <button onClick={() => onDecrease(item.id)}>-</button>

          <span> {item.quantity} </span>

          <button onClick={() => onIncrease(item.id)}>+</button>

          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      ))}

      <button
        disabled={selectedIds.length === 0}
        onClick={() => onBuy(selectedIds)}
      >
        Buy Selected
      </button>
    </div>
  );
}

export default Cart;
