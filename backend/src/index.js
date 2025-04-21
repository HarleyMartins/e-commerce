"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota para criar um produto dinamicamente
app.post('/createProduct', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, imageUrl } = request.body; // Recebe os dados do produto do corpo da requisição
    // Verifica se todos os dados foram fornecidos
    if (!name || !price || !imageUrl) {
        response.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
    }
    try {
        // Cria um novo produto no banco de dados
        const newProduct = yield prisma.product.create({
            data: { name, price, imageUrl },
        });
        // Retorna o produto criado
        response.status(201).json(newProduct);
    }
    catch (error) {
        console.error('Erro ao criar produto:', error);
        response.status(500).json({ error: 'Erro ao criar produto' });
    }
}));
// Rota para obter todos os produtos
app.get('/products', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany();
    response.json(products);
}));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend rodando na porta ${PORT}`);
});
