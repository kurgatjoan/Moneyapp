import { useState, useEffect } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, getDocs, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import 'react-dropdown/style.css';

const Send = () => {
  const [balance, setBalance] = useState(50000);
  const [contacts, setContacts] = useState([]);
  const [amountToSend, setAmountToSend] = useState('');
  const [totalSent, setTotalSent] = useState(0);
  const [username, setUsername] = useState('Andrew');

  // Currency converter states
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('KES');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userRef = doc(db, 'users', 'userId'); // Assuming a static user ID for simplicity
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, { balance: 50000, username: 'Andrew' });
        } else {
          const userData = userSnap.data();
          setBalance(userData.balance);
          setUsername(userData.username);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      }
    };

    const fetchContacts = async () => {
      try {
        const contactsCollection = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsCollection);
        const contactsList = contactsSnapshot.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .filter(contact => !contact.deleted); // Filter out deleted contacts
        setContacts(contactsList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    const fetchCurrencies = async () => {
      try {
        const response = await Axios.get('https://open.er-api.com/v6/latest/USD'); // Correct API endpoint
        const rates = response.data.rates;
        setCurrencies(Object.keys(rates));
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    };

    initializeUser();
    fetchContacts();
    fetchCurrencies();
    setTotalSent(0);
  }, []);

  const convertCurrency = async () => {
    try {
      const response = await Axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      if (rate) {
        setConversionRate(rate);
        setConvertedAmount(parseFloat(amountToSend) * rate);
      } else {
        alert("Conversion rate not available.");
      }
    } catch (error) {
      console.error("Error converting currency:", error);
      alert("Error converting currency.");
    }
  };

  const handleAddContact = async () => {
    try {
      const newContact = { fname: '', surname: '', accountNumber: '', selected: false };
      const docRef = await addDoc(collection(db, 'contacts'), newContact);
      setContacts([...contacts, { ...newContact, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id)); // Actually delete the contact document from Firestore
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleContactChange = async (index, key, value) => {
    try {
      const updatedContact = { ...contacts[index], [key]: value };
      const updatedContacts = contacts.map((contact, i) => i === index ? updatedContact : contact);
      setContacts(updatedContacts);
      await setDoc(doc(db, 'contacts', updatedContact.id), updatedContact);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const getTransactionCost = (amount) => {
    if (amount <= 1000) {
      return 10;
    } else if (amount <= 10000) {
      return 15;
    } else {
      return 20;
    }
  };

  const handleSendMoney = async (e) => {
    e.preventDefault();
      console.log("Send money button clicked");
      const sendAmount = parseFloat(amountToSend);
      console.log("Parsed amount to send:", sendAmount);
      if (!isNaN(sendAmount) && sendAmount > 0) {
        await convertCurrency();
        console.log("Converted amount:", convertedAmount);
        const transactionCost = getTransactionCost(convertedAmount);
        console.log("Transaction cost:", transactionCost);
        const totalDeduction = sendAmount + transactionCost;
        console.log("Total deduction:", totalDeduction);
        if (totalDeduction <= balance) {
          const newBalance = balance - totalDeduction;
          const newTotalSent = totalSent + sendAmount;

          setBalance(newBalance);
          setTotalSent(newTotalSent);
          await setDoc(doc(db, 'users', 'userId'), { balance: newBalance, firstname: 'Andrew', lastname :"Evans" });

          const transactionRef = collection(db, 'Transactions');

          await addDoc(transactionRef, {
            type: 'send',
            firstname: contacts.find(contact => contact.selected)?.fname || 'Unknown',
            lastname: contacts.find(contact => contact.selected)?.surname || 'Unknown',
            accountNumber: contacts.find(contact => contact.selected)?.accountNumber || 'Unknown',
            amount: convertedAmount,
            transactionCost: transactionCost,
            timestamp: serverTimestamp(),
          });

          alert(`Transaction successful! ${convertedAmount} ${toCurrency} sent.\nTransaction cost: ${transactionCost}`);
          setAmountToSend('');
        } else {
          alert("Invalid amount or insufficient balance.");
        }
      } else {
        alert("Invalid amount.");
      }
    
  }

  return (
    <div className="h-screen px-4 py-0 bg-gray-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-8xl">
        <div className="flex justify-between mb-6 items-left">
          <div className="grid">
            <h3 className="font-serif text-3xl font-bold text-black text-pretty ">Send Cash</h3>
            <p className="text-sm text-pretty text-blue-950"> Manage your money with ease </p>
          </div>
          <div className="flex items-center ">
            Help
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info ">
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
        <div className="grid md:flex-row">
          <div className="flex flex-row p-2 font-bold text-black bg-blue-200 shadow-lg text-pretty md:mt-0 md:text-m card md:w-96">
            <div className="flex p-1 card-body"> 
              <h1>Balance</h1>
              <h2>KES. {balance.toLocaleString()}</h2>
            </div>
          </div>
          <div className="flex flex-row mt-1 md:ml-0">
            <h3 className="mt-1 text-xl font-bold text-black text-pretty">Choose Recipient</h3>
          </div>
        </div>
        <div className="flex flex-col mt-2 md:flex-row">
        <div className='overflow-x-auto text-lg text-black'>
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
              <th>First Name</th>
              <th>Surname</th>
              <th>Account Number</th>
              <th>Select</th>
              <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {contacts.map((contact, index) => (
            <tr key={index}>
              <td><input type="text" value={contact.fname} onChange={(e) => handleContactChange(index, 'fname', e.target.value)} /></td>
              <td><input type="text" value={contact.surname} onChange={(e) => handleContactChange(index, 'surname', e.target.value)} /></td>
              <td><input type="text" value={contact.accountNumber} onChange={(e) => handleContactChange(index, 'accountNumber', e.target.value)} /></td>
              <td><input type="checkbox" checked={contact.selected} onChange={(e) => handleContactChange(index, 'selected', e.target.checked)} /></td>
              <td><button onClick={() => handleDeleteContact(contact.id)}>Delete</button></td>
            </tr>
          ))}
            </tbody>
            </table>
            <button className="mt-4 text-black bg-blue-200 border-none btn" onClick={handleAddContact}>Add Contact</button>
          </div>
          <div className="grid md:ml-24"> 
            <form className="mt-2" onSubmit={handleSendMoney}>
              <label className="grid text-lg font-bold text-black">Send</label>
              <input type="text" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} placeholder="KES." className="mt-2 ml-0 text-white input input-bordered bg-blue-950" />
              <div className='flex flex-row mt-2 '>
              <Dropdown options={currencies} onChange={(e) => setFromCurrency(e.value)} value={fromCurrency} placeholder="From" />
              <Dropdown options={currencies} onChange={(e) => setToCurrency(e.value)} value={toCurrency} placeholder="To" className='ml-2'/>
              </div>
              <div className='flex flex-row'>
              <button type="button" className="mt-2 text-black bg-blue-200 border-none btn" onClick={convertCurrency}>
                Convert
              </button>
              <button type="submit" className="mt-2 ml-4 text-black bg-blue-200 border-none btn">
                Send Money
              </button>
              </div>
              
              <div className="mt-3">
                <h2>Converted Amount:</h2>
                <p>{amountToSend + " " + fromCurrency + " = " + convertedAmount.toFixed(2) + " " + toCurrency}</p>
              </div>
            </form>
          </div>     
        </div>
      </div>
    </div>
  );
};

export default Send;
