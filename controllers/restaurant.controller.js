const Restaurant = require("../model/restaurant.model")

//insert data
Restaurant.createRestaurant = async (newRestaurant) => {
    try {
        const createRestaurant = await Restaurant.create(newRestaurant);
        console.log("created restaurant:", createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("err", err);
        throw err;
    }
}

//get All Restaurant
// .map = loop ข้อมูลใน Array
Restaurant.getAll = async () => {
    try {
        const allRestaurant = await Restaurant.findAll({}); // สมมุติว่าคุณใช้ Mongoose ในการเชื่อมต่อกับฐานข้อมูล
        console.log("all restaurants:", allRestaurant.map(restaurant => restaurant.toJSON()));
        return allRestaurant.map(restaurant => restaurant.toJSON());
    } catch (error) {
        console.log("err", error);
        throw error;
    }
}

//get byId
Restaurant.getOne = async () => {
    try {
        const restaurant = await Restaurant.findOne({});
        return restaurant ? restaurant.toJSON() : null;
    } catch (error) {
        console.log("err", error);
        throw error;
    }
};

//update 
Restaurant.updateTable = async (restaurantId, updates) => {
    try {
        const updatedRestaurant = await Restaurant.update(updates, { where: { id: restaurantId } });
        return updatedRestaurant
    } catch (error) {
        console.log("err", error);
        throw error;
    }
};
//delete
Restaurant.Delete = async (restaurantId) => {
    try {
        const deletedRestaurant = await Restaurant.destroy({ where:{id: restaurantId} });
        if (!deletedRestaurant) {
            return null; // Restaurant not found
        }

        console.log("deleted restaurant:", deletedRestaurant);
        return deletedRestaurant
    } catch (error) {
        console.log("err", error);
        throw error;
    }
};


module.exports = Restaurant;