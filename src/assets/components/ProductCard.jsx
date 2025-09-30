import React from "react";
export function RatingStars({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i}>{i <= Math.round(value) ? "★" : "☆"}</span>);
  }
  return <div className="rating">{stars}</div>;
}
export default function ProductCard({ product, onAddToCart, onOpenDetail }) {
  return (
    <article className="card" role="listitem">
      <button
        className="img-btn"
        onClick={() => onOpenDetail(product)}
        aria-label={`Open details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </button>
      <div className="card-body">
        <h3 title={product.name} className="truncate">
          {product.name}
        </h3>
        <div className="meta">
          {product.brand} • {product.category}
        </div>
        <div className="row">
          <div className="price">Rs {product.price}</div>
          <RatingStars value={product.rating} />
        </div>

        <div className="actions">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.inStock <= 0}
          >
            {product.inStock > 0 ? "Add to Cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
