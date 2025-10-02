const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const uploadRoutes = require("./Routes/uploadRoutes");
const authRoutes = require("./Routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));


app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
