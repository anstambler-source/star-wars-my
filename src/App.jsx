import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import {navItems} from "./utils/constants.js";
import {useState} from "react";

function App() {

    const [page, setPage] = useState(navItems[0]);

  return (
      <div className="container-fluid">
          <Header changePage={setPage} />
          <Main page={page}/>
          <Footer />
      </div>
  )
}

export default App
