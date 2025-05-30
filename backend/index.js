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
        res.send(result);
      }
    );

    // get purchase information
    app.get(
      "/purchase-coin",
      verifyToken,
      verifyTaskCreator,
      async (req, res) => {
        const result = await purchaseCollection.find().toArray();
        res.send(result);
      }
    );

    app.get("/purchase-coin/:email", async (req, res) => {
      const email = req.params.email;
      const result = await purchaseCollection.find({ email }).toArray();
      res.send(result);
    });

    // save the new user document in database
    app.post("/users", async (req, res) => {
      const userData = req.body;
      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    // get all user data
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get all user data
    app.get("/usersNormal", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get an user role
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    // update the coin information in for a single user
    app.patch("/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const updateData = req.body;
      const filter = { email };
      const updateDoc = {
        $set: { coin: updateData.newCoin },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // update role of an user
    app.patch(
      "/user/role/:email",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const email = req.params.email;
        const { newRole } = req.body;
        const updateDoc = {
          $set: { role: newRole },
        };
        const result = await userCollection.updateOne({ email }, updateDoc);
        res.send(result);
      }
    );

    // add task details in the db
    app.post("/tasks", async (req, res) => {
      const taskData = req.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
    });

    // get all tasks
    app.get("/tasks", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });

    // all posted task by a user task creator
    app.get(
      "/tasks/:email",
      verifyToken,
      verifyTaskCreator,
      async (req, res) => {
        const email = req.params.email;
        const query = { "taskProvider.email": email };
        const result = await taskCollection.find(query).toArray();
        res.send(result);
      }
    );

    // single task by Id
    app.get("/task/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // delete a task by admin
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    // update task details
    app.patch("/task/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateData = req.body;
      const updateDoc = {
        $set: {
          taskName: updateData.taskName,
          subInfo: updateData.subInfo,
          taskDetails: updateData.taskDetails,
        },
      };
      // console.log(updateDoc);
      const result = await taskCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // submission details save in database
    app.post("/submissions", verifyToken, async (req, res) => {
      const submitData = req.body;
      const result = await submissionCollection.insertOne(submitData);
      res.send(result);
    });

    // get all submission by a user
    app.get("/submissions/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await submissionCollection
        .find({ workerEmail: email })
        .toArray();
      res.send(result);
    });

    // get all submissions
    app.get("/submissions", async (req, res) => {
      const result = await submissionCollection.find().toArray();
      res.send(result);
    });

    // update status
    app.patch("/submission/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const { status } = req.body;
      const updateDoc = {
        $set: { status },
      };
      const result = await submissionCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // save withdraw data
    app.post("/withDraw", verifyToken, async (req, res) => {
      const withDrawData = req.body;
      const result = await withDrawCollection.insertOne(withDrawData);
      res.send(result);
    });

    // get all withdraw request data
    app.get("/withDraw", verifyToken, verifyAdmin, async (req, res) => {
      const result = await withDrawCollection.find().toArray();
      res.send(result);
    });

    app.delete("/withDraw/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await withDrawCollection.deleteOne(query);
      res.send(result);
    });

    // Admin Statistics
    app.get("/admin-stat", verifyToken, verifyAdmin, async (req, res) => {
      const totalUsers = await userCollection.countDocuments();
      const totalSubmission = await submissionCollection.countDocuments();
      const totalPurchase = await purchaseCollection.countDocuments();
      const totalTask = await taskCollection.countDocuments();
      res.send({
        totalUsers,
        totalSubmission,
        totalPurchase,
        totalTask,
      });
    });

    // worker creator Statistics
    app.get(
      "/taskCreator-stat",
      verifyToken,
      verifyTaskCreator,
      async (req, res) => {
        const { email } = req.body;
        console.log(email);

        const totalPurchase = await purchaseCollection.countDocuments(email);
        const totalSubmission = await submissionCollection.countDocuments({
          "taskProvider.email": email,
        });
        const totalTask = await taskCollection.countDocuments({
          "taskProvider.email": email,
        });
        // console.log(totalTask);
        res.send({
          totalPurchase,
          totalSubmission,
          totalTask,
        });
      }
    );

    //  worker Statistics
    app.get("/worker-stat", verifyToken, async (req, res) => {
      const email = "hashanuzzaman99@gmail.com";

      const totalSubmission = await submissionCollection.countDocuments({
        "worker.email": email,
      });
      const totalWithDraw = await withDrawCollection.countDocuments({
        workerEmail: email,
      });
      // console.log(totalTask);
      res.send({
        totalSubmission,
        totalWithDraw,
      });
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Assignment 12 running");
});

app.listen(port, () => {
  console.log("running on", port);
});