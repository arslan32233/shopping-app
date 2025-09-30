export function sortProducts(list, sortBy) {
  let sorted = list.slice();
  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "rating-desc") sorted.sort((a, b) => b.rating - a.rating);
  if (sortBy === "newest")
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return sorted;
}
