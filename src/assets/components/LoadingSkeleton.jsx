import React from "react";
import { RatingStars } from "./ProductCard";
export default function LoadingSkeleton({
  loading,
  filtered,
  setSelectedProduct,
  addToCart,
}) {
  return (
    <section className="main">
      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="card-skel" key={i} />
          ))}
        </div>
      ) : (
        <>
    
    
          {filtered.length === 0 ? (
            <div role="status" className="no-results">
              No results. Try clearing filters.
            </div>
          ) : (
            <div className="grid" role="list">
              {filtered.map((p) => (
                <article key={p.id} className="card" role="listitem">
                  <button
                    className="img-btn"
                    onClick={() => setSelectedProduct(p)}
                    aria-label={`Open details for ${p.name}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  </button>
                  <div className="card-body">
                    <h3 title={p.name} className="truncate">
                      {p.name}
                    </h3>
                    <div className="meta">
                      {p.brand} • {p.category}
                    </div>
                    <div className="row">
                      <div className="price">Rs {p.price}</div>
                      <RatingStars value={p.rating} />
                    </div>
                    <div className="actions">
                      <button
                        onClick={() => addToCart(p)}
                        disabled={p.stock <= 0}
                        aria-disabled={p.stock <= 0}
                      >
                        {p.stock > 0 ? "Add to Cart" : "Out of stock"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
