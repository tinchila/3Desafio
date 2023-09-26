const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');
const productManager = new ProductManager('Products.json');


app.use(express.json());
app.get('/products', async (req, res) => {
  try {
    await productManager.loadProducts();
    const { limit } = req.query;
    const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
    res.json({ products });
  } catch (error) {
    console.error('Error al intentar obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
    try {
      await productManager.loadProducts();
      const { pid } = req.params;
      const product = productManager.getProductById(parseInt(pid));
      if (product) {
        res.json({ product });
      } else {
      res.status(404).json({ error: 'El producto no fue encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por la ID:', error);
    res.status(500).json({ error: 'Error al obtener el producto por la ID' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor Express en el puerto ${PORT}`);
});

const newProduct = {
    title: 'Nombre del Producto',
    description: 'Descripción del Producto',
    price: 'Precio del Producto',
    thumbnail: 'Ruta de Imagen del Producto',
    code: 'Codigo del Producto',
    stock: 'Stock del Producto',
};

productManager.addProduct(newProduct);


const allProducts = productManager.getProducts();


