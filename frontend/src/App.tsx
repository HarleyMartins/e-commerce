// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [products, setProducts] = useState<any[]>([]); // Estado para armazenar os produtos

  // Função para buscar os produtos do backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data); // Atualiza o estado com os produtos retornados
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // useEffect para buscar os produtos quando o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []); // Esse [] garante que a busca será feita apenas uma vez, quando o componente for montado

  // Função para criar um novo produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/createProduct', {
        name,
        price: parseFloat(price),
        imageUrl,
      });

      alert('Produto criado com sucesso!');
      fetchProducts(); // Atualiza a lista de produtos após a criação de um novo produto
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      alert('Erro ao criar produto');
    }
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Criar Produto</button>
      </form>

      <h2>Produtos</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Preço: R${product.price}</p>
              <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
            </li>
          ))
        ) : (
          <p>Não há produtos cadastrados.</p>
        )}
      </ul>
    </div>
  );
};

export default App;
