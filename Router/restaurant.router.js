const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controller")

//Create a new restaurant
//http://localhost:5000/res
router.post("/res", async (req, res) => {
    try {
        const newRestaurant = req.body;
        const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
        res.status(201).json(createRestaurant)
    } catch (err) {
        res.status(500).json({ error: "Failed to create restaurant" });

    }

});
//get
router.get("/res", async (req, res) => {
    try {
        const allRestaurant = await Restaurant.getAll();
        res.status(200).json(allRestaurant);
    } catch (error) {
        res.status(500).json({ error: "Failed to get restaurants" });
    }
});

//get byId
router.get("/res/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.getOne(restaurantId);
        
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: "Failed to get restaurant by ID" });
    }
});

//update
router.put("/res/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const updates = req.body;
        const restaurant = await Restaurant.updateTable(restaurantId, updates);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(201).json({ message : "updates"});
    } catch (error) {
        res.status(500).json({ error: "Failed to update restaurant by ID" });
    }
});

//delete
router.delete("/res/:id", async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const deletedRestaurant = await Restaurant.Delete(restaurantId);

        if (!deletedRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(200).json({ message : "Delete"}); //
    } catch (error) {
        res.status(500).json({ error: "Failed to delete restaurant by ID" });
    }
});


module.exports = router;