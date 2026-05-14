const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const mockProducts = require('../data/products');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    let products = await Product.find({ ...keyword });
    
    if (products.length === 0 && Object.keys(keyword).length === 0) {
      products = mockProducts;
    }
    
    res.json(products);
  } catch (error) {
    console.error('Database error, serving mock products');
    res.json(mockProducts);
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      const mockProduct = mockProducts.find(p => p._id === req.params.id);
      if (mockProduct) {
        res.json(mockProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
    const mockProduct = mockProducts.find(p => p._id === req.params.id);
    if (mockProduct) {
      res.json(mockProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    category,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
