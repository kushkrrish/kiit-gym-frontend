import { Outlet } from "react-router-dom";
// import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
     

    </div>
  );
}

export default App;
