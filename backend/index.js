const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://work-managemnt.web.app",
  ],
  // credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6xa5uzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // collections
    const userCollection = client.db("taskProvider").collection("users");
    const withDrawCollection = client.db("taskProvider").collection("withDraw");
    const testimonialCollection = client
      .db("taskProvider")
      .collection("testimonial");
    const heroCollection = client.db("taskProvider").collection("hero");
    const taskCollection = client.db("taskProvider").collection("tasks");
    const purchaseCollection = client
      .db("taskProvider")
      .collection("purchases");
    const submissionCollection = client
      .db("taskProvider")
      .collection("submission");

    // jwt relate api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h",
      });
      res.send({ token });
    });

    // Verify Token Middleware
    const verifyToken = async (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = req.headers.authorization;
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        console.log("verify token ok");
        next();
      });
    };

    // verify admin
    const verifyAdmin = async (req, res, next) => {
      const user = req.decoded.email;
      const query = { email: user };
      const result = await userCollection.findOne(query);
      if (!result || result?.role !== "admin") {
        return res
          .status(403)
          .send({ message: "unauthorized access.........." });
      }
      console.log("admin ok");
      next();
    };

    // verify taskCreator
    const verifyTaskCreator = async (req, res, next) => {
      const user = req.decoded.email;
      const query = { email: user };
      const result = await userCollection.findOne(query);
      if (!result || result?.role !== "task-creator") {
        return res
          .status(403)
          .send({ message: "unauthorized access.........." });
      }
      console.log("creator ok");
      next();
    };

    // get all hero data
    app.get("/hero", async (req, res) => {
      const result = await heroCollection.find().toArray();
      res.send(result);
    });

    // create-payment-intent
    app.post(
      "/create-payment-intent",
      verifyToken,
      verifyTaskCreator,
      async (req, res) => {
        const price = req.body.price.price;

        const priceInCent = parseFloat(price) * 100;
        // if (!price || priceInCent < 1) return;
        // generate clientSecret
        const { client_secret } = await stripe.paymentIntents.create({
          amount: priceInCent,
          currency: "usd",
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true,
          },
          // payment_method_types: ["card"],
        });
        // send client secret as response
        res.send({ clientSecret: client_secret });
      }
    );

    // get all testimonial data
    app.get("/testimonial", async (req, res) => {
      const result = await testimonialCollection.find().toArray();
      res.send(result);
    });

    // save purchase coin information in database
    app.post(
      "/purchase-coin",
      verifyToken,
      verifyTaskCreator,
      async (req, res) => {
        const purchaseInfo = req.body;
        const result = await purchaseCollection.insertOne(purchaseInfo);