import React, { useState, useEffect } from "react";
import { getCart, updateQty, removeItem, emptyCart } from "../utils/cartUtils";
export default function CartPage() {
  const [cart, setCart] = useState([])
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
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    emptyCart();
    setCart([]);
  };
  const buttonStyle = {
    padding: "6px 12px",
    margin: "0 5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };
  const plusStyle = { ...buttonStyle, background: "#4CAF50", color: "#fff" };
  const minusStyle = { ...buttonStyle, background: "#f39c12", color: "#fff" };
  const removeStyle = { ...buttonStyle, background: "#e74c3c", color: "#fff" };
  const checkoutStyle = {
    ...buttonStyle,
    background: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    marginTop: "20px",
    fontSize: "16px",
  };
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Cart Page</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>Your cart is empty.</p>
      ) : (
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
              <div>
                <button style={plusStyle} onClick={() => handleUpdateQty(item.id, item.qty + 1)}>
                  +
                </button>
                <button style={minusStyle} onClick={() => handleUpdateQty(item.id, item.qty - 1)}>
                  -
                </button>
                <button style={removeStyle} onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div style={{ textAlign: "center" }}>
          <button style={checkoutStyle} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
