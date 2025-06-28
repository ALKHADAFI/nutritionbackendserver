import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

await dbConnect();

app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Nutrition Backend is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
