const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // Allow frontend to communicate with backend

// Hardcoded users for now
const users = [
  { id: 1, username: "technician1", password: "password123", role: "technician" },
  { id: 2, username: "technician2", password: "password123", role: "technician" },
  { id: 3, username: "technician3", password: "password123", role: "technician" },
  { id: 4, username: "technician4", password: "password123", role: "technician" },
  { id: 5, username: "technician5", password: "password123", role: "technician" },
  { id: 6, username: "technician6", password: "password123", role: "technician" },
  { id: 7, username: "technician7", password: "password123", role: "technician" },
  { id: 8, username: "technician8", password: "password123", role: "technician" },
  { id: 9, username: "technician9", password: "password123", role: "technician" },
  { id: 10, username: "technician10", password: "password123", role: "technician" },
];

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    "your-secret-key",
    { expiresIn: "24h" }
  );
  res.json({ user: { id: user.id, username: user.username, role: user.role }, token });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Inventory storage
let inventory = [];

// Add inventory item
app.post("/api/inventory", verifyToken, (req, res) => {
  const { itemName, checkInTime, checkOutTime } = req.body;
  if (!itemName || !checkInTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newItem = {
    id: inventory.length + 1,
    itemName,
    checkInTime,
    checkOutTime: checkOutTime || null,
  };
  inventory.push(newItem);
  res.json({ message: "Item added", item: newItem });
});

// Get inventory items
app.get("/api/inventory", verifyToken, (req, res) => {
  res.json(inventory);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
