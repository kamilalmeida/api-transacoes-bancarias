const express = require("express");
const app = express();
const cors = require("cors");

let contas = [];
let id = 1;

app.use(express.json());
app.use(cors());

app.post("/accounts", function (req, res) {
  const { name, overdraftProtection } = req.body;
  let currentBalance = res.req;
  currentBalance = 0;
  const conta = {
    id: id,
    name: name,
    overdraftProtection: overdraftProtection,
    currentBalance: currentBalance,
    arrayDeposit: [],
  };

  if (!name) return res.status(400).json();

  if (typeof name != "string") {
    return res.status(400).json({ resposta: "Entrada inválida!" });
  }

  let { amount } = req.body;

  if (amount != null) {
    conta.currentBalance += amount;
  }

  contas.push(conta);

  id += 1;
  console.log(conta);

  return res.status(201).json(conta);
});

app.post("/accounts/:id/deposit", function (req, res) {
  const { id } = req.params;
  const conta = contas.find((conta) => conta.id == id);

  const amount = req.body.amount;
  const data = req.body.data;
  const tipo = req.body.tipo;

  if (!amount) return res.status(400).json();

  if (!conta) return res.status(404).json({ resposta: "conta inexistente" });

  if (amount != null) {
    conta.currentBalance += amount;
    conta.arrayDeposit.push({
      data: data,
      valor: amount,
      tipo: tipo,
    });
  }

  return res.status(200).json(conta);
});

app.post("/accounts/:id/saque", function (req, res) {
  const { id } = req.params;

  const conta = contas.find((conta) => conta.id == id);

  const amount = req.body.amount;
  const data = req.body.data;
  const tipo = req.body.tipo;

  if (conta.currentBalance > 0 && conta.currentBalance >= amount && amount != null) {
    conta.currentBalance -= amount;
    conta.arrayDeposit.push({
      data: data,
      valor: amount,
      tipo: tipo,
    });
  }

  if (!amount) return res.status(400).json();

  if (!conta) return res.status(404).json({ resposta: "conta inexistente" });

  if (amount > conta.currentBalance) {
    conta.currentBalance = conta.currentBalance;
  }
  if (conta.currentBalance == undefined) {
    conta.currentBalance = 0;
  } else {
    return res.status(200).json(conta);
  }
});

app.get("/accounts", function (req, res) {
  if (contas.length <= 0) return res.status(200).json();
  res.json(contas);
});

app.get("/accounts/:id", function (req, res) {
  const { id } = req.params;
  const conta = contas.find((conta) => conta.id == id);

  if (!conta) return res.status(404).json();

  return res.json(conta);
});

app.patch("/accounts/:id", function (req, res) {
  const { id } = req.params;
  const conta = contas.find((conta) => conta.id == id);
  console.log(contas);

  let name = req.body.name;

  let overdraftProtection = req.body.overdraftProtection.toFixed(1);

  if (!conta) return res.status(404).json({ resposta: "conta inexistente" });

  if (name != null) {
    conta.name = name;
  }

  if (overdraftProtection != null) {
    conta.overdraftProtection = overdraftProtection;
  }

  if (!name && !overdraftProtection) return res.status(400).json();

  res.status(200).json(conta);
});

app.delete("/accounts/:id", function (req, res) {
  const { id } = req.params;
  const conta = contas.find((conta) => conta.id == id);

  if (conta.currentBalance > 0)
    return res.status(400).json({ resposta: "Não é possível encerrar a conta" });

  if (conta) {
    const contaFiltrada = contas.filter((conta) => conta.id != id);
    contas = contaFiltrada;

    return res.status(204).json({ resposta: "TUDO CERTO" });
  }

  if (!conta) return res.status(404).json({ resposta: "conta não encontrada" });
  res.json(conta);
});

app.listen(4567, function () {
  console.log("Rodando!");
});
