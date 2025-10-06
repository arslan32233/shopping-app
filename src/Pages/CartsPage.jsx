
import React, { useState, useEffect } from "react";
import { getCart, updateQty, removeItem } from "../utils/cartUtils";
import StripeCheckout from "../assets/components/StripeCheckout";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleUpdateQty = (id, qty) => {
    if (qty < 1) return;
    updateQty(id, qty);
    setCart(getCart());
  };

  const handleRemove = (id) => {
    removeItem(id);
    setCart(getCart());
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Cart Page</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <strong>{item.name}</strong> - Qty: {item.qty}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                    style={{
                      background: "#2ecc71",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                    style={{
                      background: "#1e1d1cff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      background: "#1344e6ff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setShowCheckout(true)}
              style={{
                padding: "10px 20px",
                marginTop: "20px",
                background: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <StripeCheckout
            cart={cart}
            onClose={() => setShowCheckout(false)}
            onSuccess={() => {
              setCart([]);
              setShowCheckout(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
