import React from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

const initialExpenses = [
  {
    id: 1,
    charge: "rent",
    amount: 1000
  },
  {
    id: 2,
    charge: "car",
    amount: 500
  },
  {
    id: 3,
    charge: "shop",
    amount: 300
  }
];

function App() {
  return (
    <>
      <Alert />
      <ExpenseForm />
      <ExpenseList />
    </>
  );
}

export default App;
