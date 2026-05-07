const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const transactionSchema = new mongoose.Schema({
  user: String,
  amount: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.get("/transactions", async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
});

app.post("/transaction", async (req, res) => {
  const { user, amount } = req.body;

  let status = amount > 10000 ? "Suspicious" : "Success";

  const transaction = new Transaction({
    user,
    amount,
    status,
  });

  await transaction.save();

  res.json({
    message: "Transaction Added",
    transaction,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});