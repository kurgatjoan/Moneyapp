
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import Layout from './Pages/Layout';
import Wallet from './Pages/Wallet';
import Send from './Pages/Send';
import Withdraw from './Pages/Withdraw';
import Groups from './Pages/Groups';
import Settings from './Pages/Settings';
import User from './Pages/User';
import "./index.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Wallet />} />
          <Route path="/send" element={<Send />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
     </BrowserRouter>
  );
}




