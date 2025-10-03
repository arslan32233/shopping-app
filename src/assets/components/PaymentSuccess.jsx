
import React from "react";

export default function PaymentSuccess({ orderTotal, itemCount, onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center relative">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        ✕
      </button>
      
      <div className="text-green-600 text-6xl mb-4">✔</div>
      <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
      <p className="text-gray-700 mb-6">
        Thank you for your order. Your payment of{" "}
        <span className="font-semibold">₨ {orderTotal}</span> for{" "}
        <span className="font-semibold">{itemCount}</span> item(s) has been
        received.
      </p>

      <button
        onClick={onClose}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-800"
      >
        Close
      </button>
    </div>
  );
}
