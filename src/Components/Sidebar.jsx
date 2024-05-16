import { useState } from 'react';
import { FaWallet, FaRegPaperPlane, FaTools, FaUserCircle, FaRegMoneyBillAlt } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Initial state: sidebar is open

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-blue-950 h-lvh ${isOpen ? 'w-42' : 'w-16'}`}>
      <header className={`flex p-4 mt-0 text-2xl font-bold text-white ${isOpen ? '' : 'hidden'}`} >
        <img src="https://api.domatron.com/storage/icons/f9d341/si.svg" alt="Afflixe icon" className="w-8 h-8 svelte-zd96s" />
        <span>Afflixe</span>
      </header>
      <div className="flex font-serif text-white ">
        <div className='mt-1 '>
          <ul className="flex-col menu menu-md">
            <li className={`flex flex-row p-0.5 duration-500 hover:text-black ${isOpen ? '' : 'hidden'  }`}>
              <div className='inline-block w-4 h-4 mt-2'>
                <FaWallet />
              </div>
              <Link to="/" className='text-lg'> Wallet</Link>
            </li>
            <li className={`flex flex-row p-0.5 duration-500 hover:text-black ${isOpen ? '' : 'hidden'}`}>
              <div className='inline-block w-4 h-4 mt-2 '><FaRegPaperPlane /></div>
              <Link to="/send" className='text-lg'>Send Cash</Link></li>
            <li className={`flex flex-row p-0.5 duration-500 hover:text-black ${isOpen ? '' : 'hidden'}`}>
              <div className='inline-block w-4 h-4 mt-2'><FaRegMoneyBillAlt /></div>
              <Link to="/withdraw " className='text-lg'>Withdraw</Link></li>
            <li className={`flex flex-row p-0.5 duration-500 hover:text-black ${isOpen ? '' : 'hidden'}`}>
              <div className='inline-block w-4 h-4 mt-2'><FaPeopleGroup /></div>
              <Link to="/groups" className='text-lg'>Groups</Link></li>
          </ul>
        </div>
        <div className={`absolute bottom-0 left-0 ${isOpen ? '' : 'hidden'}`} >
          <ul className="flex-col menu menu-md">
            <li className="flex flex-row duration-500 hover:text-black">
              <div className='inline-block w-4 h-4 mt-2'><FaTools /></div>
              <Link to="/settings" className='text-lg'>Settings</Link></li>
            <div className="  w-32 ml-0 h-0.5 divider"></div>
            <li className="mb-10 duration-500 hover:text-black">
              <div className='flex flex-row'>
                <div className='inline-block w-4 h-4 '>
                  <FaUserCircle /></div>
                <Link to="/user" className='ml-2 text-lg'>User </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button className="absolute flex items-center justify-center w-10 h-10 bg-black rounded-full bottom-1 left-2" onClick={toggleSidebar}>
        {isOpen ? <span>&lt;</span> : <span>&gt;</span>}
      </button>
    </div>
  )
}
