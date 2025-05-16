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