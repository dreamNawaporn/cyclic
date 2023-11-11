const express = require("express");
const cors = require("cors");
const sql = require("./model/db.js");
const PORT = 3000;
const restaurantRouter = require("./Router/restaurant.router");
const db = require("./model/index.js");
const role = db.role;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// dev mode
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and resync DB');
//     initial();
// })

function initial() {
    role.create({
        id: 1,
        name: 'user',
    });
    role.create({
        id: 2,
        name: "moderator",
    });
    role.create({
        id: 3,
        name: "admin",
    });
}


// server
const app = express();


// use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SwaggerDoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
    res.send("<h1>This is a  restaurant API</h1>");
})

// add Router
app.use("/", restaurantRouter);
require("./Router/auth.router.js")(app);


app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
})