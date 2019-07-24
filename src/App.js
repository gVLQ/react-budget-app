import React, {useState} from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
// Import random id generation dependency
import uuid from 'uuid/v4'

const initialExpenses = [
  {
    id: uuid(),
    charge: "rent",
    amount: 1000
  },
  {
    id: uuid(),
    charge: "car",
    amount: 500
  },
  {
    id: uuid(),
    charge: "shop",
    amount: 300
  }
];

function App() {
  // State Values
  const [expenses, setExpenses] = useState(initialExpenses);
  // Single Expense
  const [charge, setCharge] = useState('');
  // Single Amount
  const [amount, setAmount] = useState('');
  // Functionality
  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <>
      <Alert />
      <h1>Vlq's Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} 
                     amount={amount} 
                     handleAmount={handleAmount} 
                     handleCharge={handleCharge} 
                     handleSubmit={handleSubmit}/>
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending: <span className="total">$ {expenses.reduce( (acc, curr) => { return (acc += curr.amount) }, 0)}</span>
      </h1>
    </>
  );
}

export default App;
