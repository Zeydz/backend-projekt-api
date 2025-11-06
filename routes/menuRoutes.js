const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');
const verifyToken = require('../routes/verifyToken');

/* Hämta alla menyer */
router.get('/menu', async (req, res ) => {
    try {
        const menus = await MenuItem.find();
        res.json(menus)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

/* Hämta enskild meny */
router.get('/menu/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        /* Kontrollerar ifall meny finns */
        if(!menuItem) {
            return res.status(404).json({ message: 'Menyn kunde inte hittas.'})
        }
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
});

/* Skapa en ny meny */
router.post('/menu', verifyToken, async (req, res) => {
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

/* Ta bort en meny */
router.delete('/menu/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedMenu = await MenuItem.findByIdAndDelete(id);
        res.json({ message: 'Meny borttagen', deletedMenu });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/menu/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { itemName, description, price } = req.body;
    
    try {
        const updatedMenu = await MenuItem.findByIdAndUpdate(id, { itemName, description, price }, { new: true});
        res.status(200).json('Menyn uppdaterad: ' + updatedMenu);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
})

module.exports = router;