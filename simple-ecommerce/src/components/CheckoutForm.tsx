import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CartItem } from "../types/product";

interface CheckoutFormProps {
  products: CartItem[];
  onOrderComplete: () => void;
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

function CheckoutForm({ products, onOrderComplete }: CheckoutFormProps) {
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

    // Format the cart items so they are easily readable in the Formspree email
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
    <div className="checkout">
      <h2>Checkout</h2>

      {/* Selected Products */}
      <h3>Order Summary</h3>
      {products.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} × {item.quantity} = Nrs.{item.price * item.quantity}
          </p>
        </div>
      ))}
      <h3>Total: Nrs.{total}</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <br />
          <input
            {...register("name", { required: "Name is required" })}
            disabled={isSubmitting}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Phone</label>
          <br />
          <input
            {...register("phone", { required: "Phone is required" })}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label>Address</label>
          <br />
          <input
            {...register("address", { required: "Address is required" })}
            disabled={isSubmitting}
          />
          {errors.address && (
            <p style={{ color: "red" }}>{errors.address.message}</p>
          )}
        </div>

        <br />

        {submitError && <p style={{ color: "red" }}>{submitError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
