

export default function User() {
    return (
    <div className="bg-gray-300">
         <div className="flex flex-row justify-between text-cyan-700 navbar">
    <div className="grid">
            <h3 className="ml-6 text-4xl font-bold text-black text-pretty ">User</h3>
            <p className="ml-6 text-sm text-pretty text-cyan-700"> Manage your money with ease </p>
          </div>
          <div className="flex items-center font-semibold text-m">
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
    <div>
        
          <div className="flex font-sans text-black ml-7 text-m" >
            <div>
            <ul>
                <ul className="flex flex-row">
                <li>Name: </li>
                <li  className="ml-2 font-bold" >Andrew Evans</li>
                </ul>
                <ul className="flex flex-row">
                <li>Email: </li>
                <li  className="ml-2 font-bold" >andrewevans@gmail.com</li>
                </ul>
                <ul className="flex flex-row">
                <li>Account Number: </li>
                <li  className="ml-2 font-bold" > 1212898</li>
                </ul>
                <ul className="flex flex-row">
                <li  > Balance: </li>
                <li className="ml-2 font-bold" id= "Balance">50,000</li>
                </ul>
             
                
            </ul>
            </div>
        </div>
        </div>
        </div>
    )
}