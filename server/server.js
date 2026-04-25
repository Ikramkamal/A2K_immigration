const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // e.g. https://your-site.vercel.app in production
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ⚠️ Stripe webhook MUST come before express.json()
// Stripe needs the raw body to verify the signature
app.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Only process if payment was successful (not just authorized)
      if (session.payment_status !== "paid") {
        return res.json({ received: true });
      }

      const meta = session.metadata;
     
      //const deadline = new Date(Date.now() + 48 * 60 * 60 * 1000);

      const { data, error } = await supabase.from("orders").insert({
        stripe_session_id: session.id,
        email: session.customer_details.email,
        paid: true,
        immigration_category: meta.immigration_category,
        fname: meta.fname,
        lname: meta.lname,
        phone: meta.phone,
        date_of_birth: meta.date_of_birth,
        marital_status: meta.marital_status,
        children_count: parseInt(meta.children_count) || 0,
        children_birth_dates: JSON.parse(meta.children_birth_dates || "[]"),
        language_test_taken: meta.language_test_taken === "true",
        cv_file_path: meta.cv_file_path,
        language_test_file_path: meta.language_test_file_path || null,
        diplomas_file_path: meta.diplomas_file_path || null,
      });
      

      if (error) {
        console.error("Supabase insert failed:", error);
        // Still return 200 to Stripe — handle DB errors separately
        // Otherwise Stripe will retry the webhook repeatedly
      }
    }

    res.json({ received: true });
  }
);

// express.json() for all other routes
app.use(express.json());

// Creates a Stripe Checkout Session and receives form data + file paths
app.post("/create-checkout-session", async (req, res) => {
  console.log("FRONTEND_URL:", JSON.stringify(process.env.FRONTEND_URL));
  try {
    const {
      immigration_category,
      fname,
      lname,
      phone,
      date_of_birth,
      marital_status,
      children_count,
      children_birth_dates,
      language_test_taken,
      cv_file_path,
      language_test_file_path,
      diplomas_file_path,
    } = req.body;

    // Basic validation
    if (!fname || !lname || !phone || !immigration_category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: { name: "Rapport d'immigration" },
            unit_amount: 250, // $25.00 CAD in cents
          },
          quantity: 1,
        },
      ],
      // Stripe metadata: all values must be strings, max 500 chars each
      metadata: {
        immigration_category,
        fname,
        lname,
        phone,
        date_of_birth,
        marital_status,
        children_count: String(children_count || 0),
        children_birth_dates: JSON.stringify(children_birth_dates || []),
        language_test_taken: String(language_test_taken),
        cv_file_path,
        language_test_file_path: language_test_file_path || "",
        diplomas_file_path: diplomas_file_path || "",
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/rapport`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.get("/config", (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});