const express = require("express");
const router = express.Router();
const Restaurant = require("../model/restaurant.model");

const conSql = require("../model/db");
//Insert restaurant to database
router.post("/restaurant", (req, res) => {
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        img: req.body.img
    })

    //
    Restaurant.create(newRestaurant, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while inserting the new restaurant"
            })
        } else {
            res.send(data);
        }
    })
})

//Get All
router.get("/restaurant", (req, res) => {
    Restaurant.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured while inserting the new restaurant"
            });
        } else {
            res.send(data);
        }
    })
})

//Get restaurant by id
router.get("/restaurant/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.getById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === "nod_found") {
                res.status(400).send({
                    message: "Restaurant not found with this id" + restaurant

                }
                )
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while inserting the new restaurant"
                });
            }
        } else {
            res.send(data);
        }
    })
});


//
router.delete("/restaurant/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.deleteById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(400).send({
                    message: "Restaurant not found with this id: " + reId
                });
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while deleting the restaurant."
                });
            }
        } else {
            res.send({ message: "Restaurant deleted successfully." });
        }
    });
});

//update
router.put("/restaurant/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Attributes can not be empty!"
        })
    }
    // UPDATE `re` SET `name` = 'KFC_1', `type` = 'ไก่อร่อย_1', `img` = '' WHERE `re`.`id` = 8;
    conSql.query(" UPDATE re SET name = ?, type=?, img = ?  WHERE re.id = ? ",
        [req.body.name, req.body.type, req.body.img, restaurantId],
        (err, result) => {
            if (err) {
                // console.log(res);
                // result(err, null)
                res.status(400).json({ message: err.stack})
            }
            if (result.affectedRows === 0) {
                // result({ kind: "not_found" }, null)
                // result;
                res.status(400).json({ message: 'not found id ' + restaurantId })

            }
            res.status(200).json({message:result.message})
        }
    );
    // const newRestaurant = new Restaurant({
    //     name: req.body.name,
    //     type: req.body.type,
    //     img: req.body.img
    // })

    // Restaurant.updateById(restaurantId, newRestaurant, (err, data)=>{
    //     if(err){
    //         if(err.kind === "not_found"){
    //             res.status(400).send({
    //                 message: "Restaurant not found with this id: " + restaurantId
    //             });
    //         }else{
    //             res.status(500).send({
    //                 message: 
    //                 err.message || "Some error occurred while deleting the restaurant."
    //             });
    //         }
    //     }else{
    //         res.status(200).send(data);
    //     }
    // })
})




module.exports = router;