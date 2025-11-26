import {StarWarsContext} from "../utils/constants.js";
import {useContext} from "react";
import Button from "./ui/Button.jsx";

const NavItem = ({itemTitle}) => {
    const {setPage} = useContext(StarWarsContext)

    return (
        <Button callback={() => setPage(itemTitle)}>{itemTitle}</Button>
    )
}

export default NavItem;