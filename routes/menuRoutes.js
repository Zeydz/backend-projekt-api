const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

/* Hämta alla menyer */
router.get('/menu', async (req, res ) => {
    try {
        const menus = await MenuItem.find();
        res.json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

/* Skapa en ny meny */
router.post('/menu', async (req, res) => {
    const menu = new MenuItem({
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price
    });
    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

module.exports = router;