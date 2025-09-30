import React from "react";
import ProductCard from "../assets/components/ProductCard"; 
import { useNavigate } from "react-router-dom";
import productsData from "../assets/Data/Product.json"; 
import { addToCart } from "../utils/cartUtils"; 

export default function ProductList() {
  const navigate = useNavigate();

  if (!productsData || productsData.length === 0) {
    return <p>No products found.</p>;
  }
  const handleAddToCart = (product) => {
    addToCart(product);      
    navigate("/cart");        
  };

  return (
    <div className="grid" role="list">
      {productsData.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={() => handleAddToCart(p)} 
          onOpenDetail={() => navigate(`/product/${p.id}`)}
        />
      ))}
    </div>
  );
}

