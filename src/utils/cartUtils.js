export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
}
export function updateQty(id, qty) {
  let cart = getCart();
  cart = cart.map((item) =>
    item.id === id ? { ...item, qty: Math.max(1, qty) } : item
  );
  saveCart(cart);
}
export function removeFromCart(id) {
  let cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}
export const removeItem = removeFromCart;
export function emptyCart() {
  localStorage.removeItem("cart");
}
