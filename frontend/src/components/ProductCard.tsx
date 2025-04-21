// src/components/ProductCard.tsx
import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <div className="card-body">
        <h3>{name}</h3>
        <p>R$ {price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
