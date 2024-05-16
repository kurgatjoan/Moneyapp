

export default function Settings() {
    return (
    <div className="bg-gray-300">
         <div className="flex flex-row justify-between text-cyan-700 navbar">
    <div className="grid">
            <h3 className="ml-6 text-4xl font-bold text-black text-pretty ">Settings</h3>
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
    <div className="flex ml-7">
            <h3 className="text-xl font-bold text-black text-pretty ">Themes</h3>
            <input type="checkbox" value="synthwave" className="h-6 mt-1 ml-4 toggle theme-controller"/>
            </div>

        </div>
    )
}