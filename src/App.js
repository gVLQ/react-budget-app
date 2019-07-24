import React, {useState, useEffect} from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from 'uuid/v4'

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  // State Values
  const [expenses, setExpenses] = useState(initialExpenses);
  // Single Expense
  const [charge, setCharge] = useState('');
  // Single Amount
  const [amount, setAmount] = useState('');
  // Alert
  const [alert, setAlert] = useState({
    show: false
  });
  // Edit
  const [edit, setEdit] = useState(false);
  // Edit Item
  const [id, setId] = useState(0);

  // useEffect
  useEffect(() => {
    console.log('useEffect called');
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // Functionality
  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' &&  amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:'success', text:'Item Edited!'});
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({type:'success', text:'Item Added!'});
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({type:'danger', text:`Charge can't be empty value and amount must be greater than 0!`});;
    }
  }

  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 4000);
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: "danger", text: "All Items Deleted!"});
  };

  const handleDelete =(id) => {
    let tempExpenses = expenses.filter( (item) => {
      return item.id !== id;
    });
    setExpenses(tempExpenses);
    handleAlert({type: "danger", text: "Item Deleted!"});
  }

  const handleEdit =(id) => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>Vlq's Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} 
                     amount={amount} 
                     handleAmount={handleAmount} 
                     handleCharge={handleCharge} 
                     handleSubmit={handleSubmit}
                     edit={edit}/>
        <ExpenseList expenses={expenses} 
                     handleDelete={handleDelete}
                     handleEdit={handleEdit}
                     clearItems={clearItems}/>
      </main>
      <h1>
        Total Spending: <span className="total">$ {expenses.reduce( (acc, curr) => { return (acc += parseInt(curr.amount)) }, 0)}</span>
      </h1>
    </>
  );
}

export default App;
