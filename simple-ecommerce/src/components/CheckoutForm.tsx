import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CartItem } from "../types/product";

interface CheckoutFormProps {
  products: CartItem[];
  onOrderComplete: () => void;
  onBack: () => void;
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function CheckoutForm({
  products,
  onOrderComplete,
  onBack,
}: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function onSubmit(data: CheckoutFormData) {
    setIsSubmitting(true);
    setSubmitError("");

    const orderSummary = products.map(
      (item) =>
        `${item.name} × ${item.quantity} = Nrs.${item.price * item.quantity}`,
    );

    try {
      const response = await fetch("https://formspree.io/f/mgaejakb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          "Order Total": `Nrs.${total}`,
          "Order Details": orderSummary,
        }),
      });

      if (response.ok) {
        onOrderComplete();
      } else {
        setSubmitError("Failed to submit the order. Please try again.");
      }
    } catch (error) {
      setSubmitError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Cart
        </button>
        <h2>Checkout</h2>
      </div>

      <div className="cart-summary">
        <p>Total Types of Products: {products.length}</p>
        <p className="price">Order Total: Nrs.{total}</p>
      </div>

      <h3>Order Summary</h3>
      {products.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>

          <p className="price">Nrs.{item.price}</p>

          <div className="cart-actions">
            <span className="quantity">{item.quantity}</span>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit(onSubmit)} className="checkout">
        <div>
          <label>Name</label>
          <br />
          <input
            {...register("name", { required: "Name is required" })}
            disabled={isSubmitting}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            disabled={isSubmitting}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Phone</label>
          <br />
          <input
            {...register("phone", { required: "Phone is required" })}
            disabled={isSubmitting}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div>
          <label>Address</label>
          <br />
          <input
            {...register("address", { required: "Address is required" })}
            disabled={isSubmitting}
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <br />

        {submitError && <p className="error">{submitError}</p>}

        <div className="cart-buttons">
          <button type="submit" disabled={isSubmitting} className="buy-btn">
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
