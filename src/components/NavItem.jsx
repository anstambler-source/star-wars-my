const NavItem = ({itemTitle, changePage}) => {
    return (
        <li onClick={() => changePage(itemTitle)}
            className="nav-item btn btn-danger mx-1 border-warning">{itemTitle}</li>
    )
}

export default NavItem;