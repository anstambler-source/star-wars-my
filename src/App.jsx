import './App.css'
import './Contact.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import {navItems, StarWarsContext} from "./utils/constants.js";
import {useState} from "react";

function App() {

    const [page, setPage] = useState(navItems[0]);

    return (
        <div className="container-fluid">
            <StarWarsContext value={{page, setPage}}>
                <Header/>
                <Main/>
            </StarWarsContext>
            <Footer/>
        </div>
    )
}

export default App
