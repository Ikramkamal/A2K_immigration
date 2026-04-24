const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

require("dotenv").config(); // automatically loads .env from root

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);


// Middleware
app.use(express.json());

// // Optional: serve static files safely
// const STATIC_DIR = path.join(__dirname, "public");
// app.use(express.static(STATIC_DIR));

// // Home route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(STATIC_DIR, "index.html"));
// });

app.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,        // in cents — $50.00
    currency: "cad",
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

// Also expose your publishable key
app.get("/config", (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Start server
const PORT = 5252;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});