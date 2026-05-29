const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


// OBTENER PRODUCTOS
router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// CREAR PRODUCTO
router.post("/", async (req, res) => {

    try {

        const product = new Product({

            name: req.body.name,

            price: req.body.price,

            description: req.body.description,

            image: req.body.image,

            stock: req.body.stock
        });

        const newProduct = await product.save();

        res.status(201).json(newProduct);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
});


// ELIMINAR PRODUCTO
router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Producto eliminado"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// ACTUALIZAR PRODUCTO
router.put("/:id", async (req, res) => {

    try {

        const updatedProduct =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;