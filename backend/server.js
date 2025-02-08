const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Example Route - Get All Users
app.get("/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    let users = [];
    snapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Example Route - Add New User
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const userRef = await db.collection("users").add({ name, email });
    res.status(201).json({ id: userRef.id, name, email });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user", details: error.message });
  }
});

// Start Server Locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
