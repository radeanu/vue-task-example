import fs from 'fs/promises';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

const cart = [];

app.use(cors());

function useRepository() {
  function getCart() {
    return cart;
  }

  async function getBrands() {
    const list = await fs.readFile('./data/brands.json', { encoding: 'utf8' });

    return JSON.parse(list);
  }

  async function getProducts(brand_code = '') {
    const list = await fs.readFile('./data/level3/products.json', {
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
    getBrands,
    getProducts
  };
}

const repository = useRepository();

app.get('/api/cart', (req, res) => {
  const cartItems = repository.getCart();

  return res.status(200).json(cartItems);
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

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
