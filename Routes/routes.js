const { urlencoded } = require("express");
const express = require ("express");
const { Router } = express;
const products = require("../Productos/products");

const router = Router();

router.get("/", (req, res) => {
    res.send(products);
});
router.get("/:id", (req, res) => {
    console.log("req", req.params.id);
    const numero = req.params.id;
    if(isNaN(numero)) res.json({ error: "El parametro no es un numero" });
    if((numero < 1) || (numero > products.length)) 
        res.json({ error: "Producto no encontrado" });
    res.send(products[numero - 1].title);
});

router.post("/", (req, res) => {
    const newProduct = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail};
        newProduct.id = products.length + 1;
        products.push(newProduct);
        res.status(201).json({Agregada: newProduct });
});

 router.delete('/:id', (req, res) => {
        let index = products.findIndex(producto => producto.id === Number(req.params.id));
        if (index >= 0) {
            products.splice(index, 1);
            res.send({ message: 'Eliminado' });
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
});

    router.put('/:id', (req, res) => {
        let { title, price, thumbnail } = req.body;
        let index = products.findIndex(producto => producto.id === Number(req.params.id));
        if (index >= 0) {
            products[index] = { title, price, thumbnail };
            products[index].id = Number(req.params.id);
            res.send(products[index]);
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    });
    
    
module.exports = router

