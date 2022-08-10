const express = require("express");
const app = express();
const cors = require("cors");

let accounts = [];
let id = 1;

app.use(express.json());
app.use(cors());

app.post("/accounts", function (req, res) {
  const { name, overdraftProtection } = req.body;
  let currentBalance = res.req;
  currentBalance = 0;
  const account = {
    id: id,
    name: name,
    overdraftProtection: overdraftProtection,
    currentBalance: currentBalance,
    arrayDeposit: [],
  };

  if (!name) return res.status(400).json();

  if (typeof name != "string") {
    return res.status(400).json({ response: "Invalid Input" });
  }

  let { amount } = req.body;

  if (amount != null) {
    account.currentBalance += amount;
  }

  accounts.push(account);
  id += 1;

  return res.status(201).json(account);
});

app.post("/accounts/:id/deposit", function (req, res) {
  const { id } = req.params;
  const account = accounts.find((account) => account.id == id);

  const amount = req.body.amount;
  const date = req.body.date;
  const type = req.body.type;

  if (!amount) return res.status(400).json();

  if (!account) return res.status(404).json({ response: "Account not exist" });

  if (amount != null) {
    account.currentBalance += amount;
    account.arrayDeposit.push({
      date: date,
      value: amount,
      type: type,
    });
  }

  return res.status(200).json(account);
});

app.post("/accounts/:id/saque", function (req, res) {
  const { id } = req.params;

  const account = accounts.find((account) => account.id == id);

  const amount = req.body.amount;
  const date = req.body.date;
  const type = req.body.type;

  if (account.currentBalance > 0 && account.currentBalance >= amount && amount != null) {
    account.currentBalance -= amount;
    account.arrayDeposit.push({
      date: date,
      value: amount,
      type: type,
    });
  }

  if (!amount) return res.status(400).json();

  if (!account) return res.status(404).json({ response: "Account not exist" });

  if (amount > account.currentBalance) {
    account.currentBalance = account.currentBalance;
  }
  if (account.currentBalance == undefined) {
    account.currentBalance = 0;
  } else {
    return res.status(200).json(account);
  }
});

app.get("/accounts", function (req, res) {
  if (accounts.length <= 0) return res.status(200).json();
  res.json(accounts);
});

app.get("/accounts/:id", function (req, res) {
  const { id } = req.params;
  const account = accounts.find((account) => account.id == id);

  if (!account) return res.status(404).json();

  return res.json(account);
});

app.patch("/accounts/:id", function (req, res) {
  const { id } = req.params;
  const account = accounts.find((account) => account.id == id);

  let name = req.body.name;
  let overdraftProtection = req.body.overdraftProtection.toFixed(1);

  if (!account) return res.status(404).json({ response: "Account not exist" });

  if (name != null) {
    account.name = name;
  }

  if (overdraftProtection != null) {
    account.overdraftProtection = overdraftProtection;
  }

  if (!name && !overdraftProtection) return res.status(400).json();

  res.status(200).json(account);
});

app.delete("/accounts/:id", function (req, res) {
  const { id } = req.params;
  const account = accounts.find((account) => account.id == id);

  if (account.currentBalance > 0)
    return res.status(400).json({ response: "Unable to close account" });

  if (account) {
    const filteredAccount = accounts.filter((account) => account.id != id);
    accounts = filteredAccount;

    return res.status(204).json({ response: "Account deleted" });
  }

  if (!account) return res.status(404).json({ response: "Account not found" });
  res.json(account);
});

app.listen(4567, function () {
  console.log("Rodando!");
});
