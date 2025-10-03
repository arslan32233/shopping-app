// src/components/StripeCheckout.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentSuccess from "./PaymentSuccess";

const stripePromise = loadStripe("pk_test_51SDPPtKZ22dbf9hVBKrCOGoQTZClyrZR2LJdzh3FQjXkBLIU1TNKwNdOZmS9Ibv2fO6UrBtoy9VOAFlGG2lUPcXw00VwBUCCBA");

function CheckoutForm({ cart, total, onSuccess, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardValid, setCardValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleCardChange = (event) => {
    setPaymentError(null);
    if (event.complete) {
      setCardComplete(true);
      setValidationMessage("✓ Card looks good!");
    } else {
      setCardComplete(false);
      setValidationMessage("");
    }
    if (event.error) {
      setCardValid(false);
      setValidationMessage(event.error.message);
    } else {
      setCardValid(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentError(null);

    if (!stripe || !elements) {
      setPaymentError("Stripe not ready.");
      return;
    }
    if (!cardComplete || !cardValid) {
      setPaymentError("Please enter valid card info.");
      return;
    }

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message || "Payment failed.");
        setLoading(false);
        return;
      }

      await new Promise((r) => setTimeout(r, 1000));
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      setPaymentError("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">Stripe Checkout (Demo)</h2>

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
        {validationMessage && (
          <p className={`text-sm mt-2 ${cardValid ? "text-green-600" : "text-red-500"}`}>
            {validationMessage}
          </p>
        )}
        {paymentError && <p className="text-red-500 text-sm mt-2">{paymentError}</p>}

        <button
          type="submit"
          disabled={loading || !stripe || !cardComplete || !cardValid}
          className="w-full py-3 px-4 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-800 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : `Pay ₨ ${total}`}
        </button>
      </form>
    </div>
  );
}

export default function StripeCheckout({ cart = [], onClose, onSuccess }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSuccess = () => {
    setShowSuccess(true);
    onSuccess && onSuccess();
  };

  if (showSuccess) {
    return <PaymentSuccess orderTotal={total} itemCount={cart.length} onClose={onClose} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cart={cart} total={total} onSuccess={handleSuccess} onClose={onClose} />
    </Elements>
  );
}
