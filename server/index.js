const express = require("express")
require("dotenv").config()
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./DB/connectDB");
const UserRoutes = require("./routes/UserRoutes");
const CarRoutes = require("./routes/CarRoutes");
const BookingRoutes = require("./routes/BookingRoutes")

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/carRental"
connectDB(DB_URL);


const app = express()

//use Middlware
app.use(express.json());
app.use(cors())
app.use(logger("combined"));
app.use(express.urlencoded({ extended: true })); 
//home route
app.get("/", async (req, res) => {
    res.send("CarRental API")
});

//routes
app.use("/api", UserRoutes)
app.use("/api", CarRoutes)
app.use("/api", BookingRoutes)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log(`Server is Running On PORT : ${PORT}`);
});