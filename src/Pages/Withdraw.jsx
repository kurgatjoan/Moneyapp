import { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { addDoc, collection, serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore';

const Withdraw = () => {
  const [balance, setBalance] = useState(50000);
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [firstname, setFirstname] = useState('Andrew');
  const [lastname, setLastname] = useState('Evans');
  
  useEffect(() => {
    // Initialize user in Firestore
    const initializeUser = async () => {
      const userRef = doc(db, 'users', 'userId'); 
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { balance: 50000, firstname: 'Andrew', lastname: 'Evans' });
      } else {
        const userData = userSnap.data();
        setBalance(userData.balance);
        setFirstname(userData.firstname);
        setLastname(userData.lastname);
      }
    };

    initializeUser();
    setTotalWithdraw(0);
  }, []);

  const getTransactionCost = (amount) => {
    if (amount <= 1000) {
      return 10;
    } else if (amount <= 10000) {
      return 15;
    } else {
      return 20;
    }
  };

  const handleWithdrawMoney = async (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amountToWithdraw);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      const transactionCost = getTransactionCost(withdrawAmount);
      const totalDeduction = withdrawAmount + transactionCost;
      if (totalDeduction <= balance) {
        const newBalance = balance - totalDeduction;
        const newTotalWithdraw = totalWithdraw + withdrawAmount;
        
        setBalance(newBalance);
        setTotalWithdraw(newTotalWithdraw);
        await setDoc(doc(db, 'users', 'userId'), { balance: newBalance, firstname :"Andrew", lastname :"Evans" });

        const transactionRef = collection(db, 'Transactions');

        await addDoc(transactionRef, {
          firstname: 'Andrew',
          lastname: 'Evans',
          type: 'withdrawal',
          accountNumber: '1212898',
          amount: withdrawAmount,
          transactionCost: transactionCost,
          timestamp: serverTimestamp(),
          totalDeduction : totalDeduction,
          
        }); 

        alert(`Transaction successful! ${withdrawAmount} KES withdrawn.\nTransaction cost: ${transactionCost} KES`);
        setAmountToWithdraw('');
      } else {
        alert("Invalid amount or insufficient balance.");
      }
    } else {
      alert("Invalid amount.");
    }
  };

  return (
    <div className="px-4 py-0 bg-gray-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-8xl ">
        {/* Navbar */}
        <div className="flex flex-row justify-between w-full bg-gray-300 text-blue-950 navbar">
          <div className="grid">
            <h3 className="font-serif text-3xl font-bold text-black text-pretty">Withdraw Cash</h3>
            <p className="text-sm text-pretty">Manage your money with ease</p>
          </div>
          <div className="flex items-center font-semibold text-m">
            Help
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
              <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                <div tabIndex={0} className="card-body">
                  <h2 className="card-title">You needed more info?</h2> 
                  <p>Here is a description!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full mt-2 ml-2 items-left">
        <div className="flex flex-row p-2 font-bold text-black bg-blue-200 shadow-lg text-pretty md:mt-1 md:text-m card md:w-96">
            <div className="flex p-2 card-body"> 
              <h1>Balance</h1>
              <h2>KES. {balance.toLocaleString()}</h2>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:w-96">
            <form className="grid mt-4 grid-row-3" onSubmit={handleWithdrawMoney}>
              <label className="text-lg font-bold text-black">Enter Amount</label>
              <input type="text" value={amountToWithdraw} onChange={(e) => setAmountToWithdraw(e.target.value)} placeholder="KES." className="text-white input input-bordered bg-blue bg-blue-950" />
              <button type="submit" className="mt-5 text-black bg-blue-200 border-none btn">
                Withdraw Money
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
