const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./client/config/db");


//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// 1 test route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
//app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

app.put('/admin/update-donor/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  // Find the donor by id
  const donorIndex = donorData.findIndex(donor => donor._id === id);

  if (donorIndex !== -1) {
    // Update donor data
    donorData[donorIndex] = {
      ...donorData[donorIndex],
      name: name || donorData[donorIndex].name,
      email: email || donorData[donorIndex].email,
      phone: phone || donorData[donorIndex].phone
    };

    res.status(200).json({ success: true, message: 'Donor updated successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Donor not found' });
  }
});



//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});