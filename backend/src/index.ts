// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para criar um produto dinamicamente
app.post('/createProduct', async (request: Request, response: Response) => {
  const { name, price, imageUrl } = request.body; // Recebe os dados do produto do corpo da requisição

  // Verifica se todos os dados foram fornecidos
  if (!name || !price || !imageUrl) {
    response.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return
    }

  try {
    // Cria um novo produto no banco de dados
    const newProduct = await prisma.product.create({
      data: { name, price, imageUrl },
    });

    // Retorna o produto criado
    response.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    response.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Rota para obter todos os produtos
app.get('/products', async (request: Request, response: Response) => {
  const products = await prisma.product.findMany();
  response.json(products);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
