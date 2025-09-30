import React from "react";
import { useParams } from "react-router-dom";
import { RatingStars } from "../assets/components/ProductCard";
import productsData from "../assets/Data/Product.json";
import { addToCart } from "../utils/cartUtils";
export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id);
  if (!product) {
    return <p>Product not found.</p>;
  }
  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="detail">
        <div className="detail-grid">
          <div>
            <img
              src={product.image}
              alt={product.name}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/400x400?text=No+Image")
             }
            />
          </div>
          <div>
            <h2>{product.name}</h2>
            <div className="meta">
              {product.brand} • {product.category}
            </div>
            <RatingStars value={product.rating} />
            <p>{product.description}</p>
            <div className="row between">
              <div className="price large">Rs {product.price}</div>
              <div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.inStock <= 0}
                >
                  {product.inStock > 0 ? "Add to Cart" : "Out of stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
