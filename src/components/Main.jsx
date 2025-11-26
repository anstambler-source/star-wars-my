import Home from "./Home.jsx";
import Contact from "./Contact.jsx";
import {navItems, StarWarsContext} from "../utils/constants.js";
import AboutMe from "./AboutMe.jsx";
import StarWars from "./StarWars.jsx";
import {useContext} from "react";

const Main = () => {
    const {page} = useContext(StarWarsContext); // ispolzuem zna4enie 'page' iz kontexta (destrukturiruya ego)

    switch (page) {
        case navItems[1]:
            return <AboutMe/>
        case navItems[2]:
            return <StarWars/>
        case navItems[3]:
            return <Contact/>
        default:
            return <Home/>
    }
}

export default Main;