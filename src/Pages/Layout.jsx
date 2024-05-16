
import Sidebar from "../Components/Sidebar";
import {Outlet} from "react-router-dom";


export default function Layout() {
    return (
        <div className="flex flex-col bg-white ">
              <div className="flex flex-1 ">
        <Sidebar/>
        <div className="w-screen overflow-auto bg-gray-300">
       
        <Outlet />
        </div>
      </div>
       

        </div>
     
);
}   
