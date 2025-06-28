import express from 'express';
import Product from '../models/Product.js';
import evaluateHealth from '../helpers/evaluateHealth.js';

const router = express.Router();

router.get('/:barcode', async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    const result = evaluateHealth(product);
    res.status(200).json({ ...product._doc, ...result });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil produk', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { barcode } = req.body;
    const existing = await Product.findOne({ barcode });
    if (existing) {
      return res.status(409).json({ message: 'Produk sudah ada' });
    }
    const product = new Product(req.body);
    await product.save();
    const result = evaluateHealth(product);
    res.status(201).json({ ...product._doc, ...result });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan produk', error: err.message });
  }
});

export default router;
