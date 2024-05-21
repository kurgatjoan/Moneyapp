// import { useEffect } from 'react';
// import db from '../firebase';

export default function Groups() {
    return (
      <div className="h-screen px-4 py-0 bg-gray-300 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-8xl ">
    <div className="flex justify-between mb-6 items-left">
          <div className="grid">
            <h3 className="font-serif text-3xl font-bold text-black text-pretty ">Groups</h3>
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
    <div >
        <h3 className="text-black">Create groups at your convenience</h3>
    <button className="mt-4 text-black bg-blue-200 border-none btn btn-xs sm:btn-sm md:btn-md" >
                  Create Group
                </button>
    </div>


        </div>
        </div>  
    )
}