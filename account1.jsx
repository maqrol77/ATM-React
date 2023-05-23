const ATMDeposit = ({ onChange }) => {
  return (
    <label className="label huge">
      <input type="number" min="0" pattern="[0-9]*" onChange={onChange} style={{ width: "30%", textAlign: "center", fontSize: "200%" }} />
    </label>
  );
};

const Account = () => {
  const [accountState, setAccountState] = React.useState(0);
  const [deposit, setDeposit] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [showTransactions, setShowTransactions] = React.useState(false);

  const handleChange = event => {
    let input = Number(event.target.value);
    setDeposit(input);
  };

  const handleDeposit = event => {
    if (deposit > 0) {
      let newTotal = deposit + accountState;
      setAccountState(newTotal);
      setTransactions(prevTransactions => [
        { amount: deposit, balance: newTotal },
        ...prevTransactions,
      ]);
      alert(`You have deposited $${deposit}`);
    }
    event.preventDefault();
  };
  
  const handleCashback = event => {
    if (accountState >= 0) {
      let newTotal = accountState - deposit;
      if (newTotal >= 0) {
        setAccountState(newTotal);
        setTransactions(prevTransactions => [
          { amount: -deposit, balance: newTotal },
          ...prevTransactions,
        ]);
        alert(`You have withdrawn $${deposit}`);
      } else {
        alert("Insufficient funds! Please check your balance.");
      }
    } else {
      alert("Insufficient funds! Please check your balance.");
    }
    if (accountState === 0) {
      setDeposit(0);
    }
    event.preventDefault();
  };
  

  const handleShowTransactions = event => {
    event.preventDefault();
    setShowTransactions(true);
  };

  return (
    <div className="container">
      <form>
        <h2>Account Balance $ {accountState}</h2>
        <ATMDeposit onChange={handleChange} />
        <div className="button-wrapper">
          <button className="deposit-button" onClick={handleDeposit}>Deposit</button>
          {accountState > 0 && <button className="cashback-button" onClick={handleCashback}>Cashback</button>}
        </div>
        {transactions.length > 0 && (
          <div>
            <button className="transaction-button" onClick={handleShowTransactions}>Transactions</button>
            {showTransactions && (
              <ul className="transactions-list">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <li key={index} className={transaction.amount >= 0 ? "deposit" : "withdrawal"}>
                    {transaction.amount >= 0 ? `+ $${transaction.amount}` : `- $${Math.abs(transaction.amount)}`} <span className="balance"> - Balance ${transaction.balance}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

ReactDOM.render(<Account />, document.getElementById("root"));
