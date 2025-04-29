const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

// Import routes for various functionalities
const inventoryRouter = require("./Route/InventoryRoutes");
const binRouter = require("./Route/binRoutes");
const recycleRoutes = require('./Route/recycleRoutes');
const adminRouter = require("./Route/AdminRoute");
const bidsRouter = require("./Route/BidsReqRoutes");
const leaveRoutes = require("./Route/leaveRoutes");
const overtimeRoutes = require("./Route/overtimeRoutes");
const employeeRoutes = require("./Route/employeeRoutes"); // Updated route name
const router = require("./Route/financeRoutes");
const wasteRoute = require("./Route/wasteRoute");
const Requestrouter = require("./Route/UserRequestRoute"); // Updated route import

// Create an Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // To parse JSON data
app.use(cors()); // To allow cross-origin requests

// MongoDB connection using environment variable for URI
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:Cj1fYopndjY6fCmz@cluster0.z3zgd.mongodb.net/CleanCycle")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user', 'recycler', 'collector', 'finance', 'hr', 'recyclemgr'] }
});

const User = mongoose.model('User', userSchema);

// Routes for user authentication (Register and Login)

// Register (with bcrypt for password hashing)
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).send('User registered');
});

// Login (with JWT token generation)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Routes for inventory, bin, and recycle operations
app.use("/inventory", inventoryRouter);
app.use("/api", binRouter);
app.use("/recycle", recycleRoutes);

// Routes for admin and bids requests
app.use("/admin", adminRouter);
app.use("/bids", bidsRouter);

//Routes for HR Management
app.use("/api", leaveRoutes);
app.use("/api", overtimeRoutes);
app.use("/employees", employeeRoutes); // Change endpoint from /users to /employees

//Routes for Finance Management
app.use("/transactionsdb", router);

//Routes for Bin IOT
app.use('/api', wasteRoute);

//Routes for User Requests 
app.use("/userRequest", Requestrouter); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // For CommonJS export if needed
