import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.API_PORT || 4000;
const APP_HOST = process.env.API_HOST ?? 'localhost';
const cart = [];

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const __filename = fileURLToPath(import.meta.url);
const BASE_PATH = path.dirname(__filename);

function useRepository() {
  function getCart() {
    return cart;
  }

  function addToCart(sku, count = 1) {
    const itemIndex = cart.findIndex((i) => i.sku === sku);

    if (itemIndex === -1) {
      return cart.push({ sku, count });
    }

    return (cart[itemIndex].count += count);
  }

  async function getBrands() {
    const list = await fs.readFile(BASE_PATH + '/data/brands.json', {
      encoding: 'utf8'
    });

    return JSON.parse(list);
  }

  async function getProducts(brand_code = '') {
    const list = await fs.readFile(BASE_PATH + '/data/level3/products.json', {
      encoding: 'utf8'
    });

    const parsedList = JSON.parse(list);

    if (!brand_code.length) return parsedList;

    const brands = await getBrands();
    const findBrand = brands.find((b) => b.code === brand_code);

    if (!findBrand) return [];

    return parsedList.filter((p) => p.brand === findBrand.id);
  }

  return {
    getCart,
    addToCart,
    getBrands,
    getProducts
  };
}

const repository = useRepository();

app.get('/api/cart', (req, res) => {
  console.log('GET CART');
  const cartItems = repository.getCart();

  return res.status(200).json(cartItems);
});

app.post('/api/cart', (req, res) => {
  const { sku, count } = req.body;
  repository.addToCart(sku, count);

  return res.status(200).json({});
});

app.get('/api/brands', async (req, res) => {
  console.log('GET BRANDS');
  const brands = await repository.getBrands();

  return res.status(200).json(brands);
});

app.get('/api/products', async (req, res) => {
  console.log('GET PRODUCTS');

  const { brand } = req.query;
  const products = await repository.getProducts(brand);

  return res.status(200).json(products);
});

const listen_callback = () => {
  return console.log(`🚀 App listening at http://${APP_HOST}:${PORT}`);
};

APP_HOST === 'localhost'
  ? app.listen(PORT, listen_callback)
  : app.listen(PORT, APP_HOST, listen_callback);
