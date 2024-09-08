const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/FlightBookin")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const userRoute = require("./routes/userRoutes");
app.use(userRoute);


const adminRouter = require("./routes/adminRoute");
app.use(adminRouter);


const reportRouter = require("./routes/report")
app.use(reportRouter)

const bookingSchema = require("./model/flight");


app.get("/bookings/totalPrice", async (req, res) => {
  try {
    const totalPrice = await bookingSchema.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$price" }
        }
      }
    ]);

    res.send({ totalPrice: totalPrice[0]?.total || 0 });
  } catch (error) {
    res.status(500).send({ error: "Failed to calculate total price" });
  }
});


app.get("/passanger/total", async (req, res) => {
  try {
    const passanger = await bookingSchema.countDocuments();
    res.send({ passanger });
  } catch (error) {
    res.status(500).send({ error: "Failed to count passengers" });
  }
});




app.post("/create", async (req, res)=>{
    const booking = bookingSchema(req.body)
    const savebookin = await booking.save()
    if(savebookin){
        res.send("booking has been successfully")
    }
})


app.get("/results", async (req, res)=>{
    const getData = await bookingSchema.find()
    if(getData){
        res.send(getData)
    }
})




app.listen(1000, () => {
  console.log("Server is running on port 1000");
});