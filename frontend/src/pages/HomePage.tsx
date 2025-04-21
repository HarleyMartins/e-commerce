// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Fazendo requisição para o backend
    axios.get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos', error);
      });
  }, []);
  
  return (
    <div className="home-page">
      <h1>Produtos</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
