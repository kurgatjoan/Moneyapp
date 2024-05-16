import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase'; 
import { doc, getDocs, getDoc, collection } from 'firebase/firestore'; 
import { format } from 'date-fns';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceDoc = await getDoc(doc(db, 'users', 'userId')); // Assuming you have a 'users' collection and the user document ID is 'userId'
        if (balanceDoc.exists()) {
          const userData = balanceDoc.data();
          setBalance(userData.balance);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsCollection = collection(db, 'Transactions');
        const transactionsSnapshot = await getDocs(transactionsCollection);
        const transactionsList = transactionsSnapshot.docs.map(doc => doc.data());
        setTransactions(transactionsList);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return format(date, 'MMM dd, yyyy HH:mm:ss');
    }
    return '';
  };


  return (
    <div className='bg-gray-300'>
      <div className="px-4 py-0 bg-gray-300 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-8xl">
        <div className="flex justify-between mb-6 items-left ">
          <div className="grid">
            <h3 className="font-serif text-3xl font-bold text-black text-pretty ">My Wallet</h3>
            <p className="text-sm text-pretty">Manage your money with ease</p>
          </div>
          <div className="flex items-center">
            Help
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
              <div className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                <div className="card-body">
                  <h2 className="card-title">You needed more info?</h2> 
                  <p>Here is a description!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center -mx-4 sm:justify-start">
          <div className="flex flex-col justify-center w-full px-4 mt-0 sm:w-96 sm:mt-0">
            <div className="p-4 font-bold text-black bg-blue-200 shadow-lg card text-pretty">
              <h1>Hi Andrew!</h1>
              <h1>Your balance is KSH. {balance.toLocaleString()}</h1> 
            </div>
          </div>
          <div className="flex flex-col justify-center w-full px-4 mt-6 sm:w-48">
            <div className="p-4 font-bold text-black bg-blue-200 shadow-lg text-pretty card">
              <h1>Send Money</h1>
            </div>
          </div>
          <div className="justify-center w-full px-4 mt-6 sm:w-52">
            <div className="p-4 font-bold text-black bg-blue-200 shadow-lg text-pretty card">
              <h1>Withdraw Money</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <label className="flex items-center gap-2 input input-bordered">
            <input type="text" className="grow" placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </div>
        <div>
          <h3 className="p-0 mt-0 text-xl font-bold text-black caption-left ">Recent Transactions</h3>
          <div className="overflow-x-auto text-lg text-black">
          <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th></th> 
                  <th>First Name</th> 
                  <th>Surname</th>
                  <th>Type</th> 
                  <th>Account Number</th> 
                  <th>Amount</th> 
                  <th>Timestamp</th>
                  <th></th> 
                </tr>
              </thead> 
              <tbody id="transactionTable">
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{transaction.firstname}</td>
                    <td>{transaction.lastname}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.accountNumber}</td>
                    <td>{transaction.amount}</td>
                    <td>{formatTimestamp(transaction.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};



Wallet.propTypes = {
  initialBalance: PropTypes.number,}
export default Wallet;
