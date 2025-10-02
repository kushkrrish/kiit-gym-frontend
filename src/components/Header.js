

const Header=()=>{
    
   
    return(
        <div className="h-20 w-screen flex items-center justify-between bg-gray-100">
            <div className="flex items-center justify-center">
                <img alt="kiit" src="https://tse4.mm.bing.net/th/id/OIP.H1ea9cP7fh4K_lZa5dKSdgHaFw?pid=Api&P=0&h=180" className="h-10 w-auto ml-3"/>
            <h1 className="text-green-600 font-bold text-sm ml-4">KIIT Sports Complex</h1>

            </div>
            {/* {isAuthenticated && <button onClick={handelLogout} className="w-20 mr-5 bg-green-700 text-white py-2 px-2 rounded-lg hover:bg-green-800 transition">Logout</button>} */}
        </div>
    )
}
export default Header