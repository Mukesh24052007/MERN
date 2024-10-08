import mongoose from "mongoose";

import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ success: true, data: product});  
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "server not found." });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name) {
    return res.status(400).json({ success: false, message: "Please provide name." });
  }
  if (!product.price) {
    return res.status(400).json({ success: false, message: "Please provide price." });
  }
  if (!product.image) {
    return res.status(400).json({ success: false, message: "Please provide image." });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "server error"});
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, menubar: "product not found." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "server not found."});
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, menubar: "product not found." });
  }
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted successfully." })
  } catch (error) {
    console.log(error.message);
   res.status(500) .json({ success: false, message: "server not found."})
  }
}