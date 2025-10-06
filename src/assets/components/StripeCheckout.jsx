import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./PaymentSuccess"; // ✅ import your success component

const stripePromise = loadStripe("pk_test_51SDPPtKZ22dbf9hVBKrCOGoQTZClyrZR2LJdzh3FQjXkBLIU1TNKwNdOZmS9Ibv2fO6UrBtoy9VOAFlGG2lUPcXw00VwBUCCBA");

// ✅ Checkout Form
function CheckoutForm({ cart, total, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validCard, setValidCard] = useState(false);

  const handleCardChange = (e) => {
    setError(e.error ? e.error.message : "");
    setValidCard(e.complete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!validCard) {
      setError("Please enter a valid card.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
      } else {
        // ✅ Simulate successful payment
        setTimeout(() => {
          onSuccess(); // clear cart + show success screen
        }, 1000);
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Stripe Checkout</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2 mb-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.qty}</p>
            </div>
            <p className="font-bold">₨ {item.price * item.qty}</p>
          </div>
        ))}
        <div className="border-t pt-3 mt-3 flex justify-between font-bold">
          <span>Total:</span>
          <span>₨ {total}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#424770" },
                invalid: { color: "#fa755a" },
              },
              hidePostalCode: true,
            }}
            onChange={handleCardChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full py-3 px-4 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-800 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : `Pay ₨ ${total}`}
        </button>
      </form>
    </div>
  );
}

// ✅ Main Component
export default function StripeCheckout({ cart = [] }) {
  const [paid, setPaid] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ clear cart + show success screen
  const handleSuccess = () => {
    localStorage.removeItem("cart");
    setPaid(true);
  };

  // ✅ close success screen
  const handleClose = () => {
    setPaid(false);
    window.location.href = "/"; // redirect to home (optional)
  };

  return (
    <Elements stripe={stripePromise}>
      {paid ? (
        <PaymentSuccess
          orderTotal={total}
          itemCount={cart.length}
          onClose={handleClose}
        />
      ) : (
        <CheckoutForm cart={cart} total={total} onSuccess={handleSuccess} />
      )}
    </Elements>
  );
}
