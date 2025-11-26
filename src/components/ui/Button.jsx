const Button = ({children, callback, classname}) => {
    return (
        <div
            onClick={callback ?? (() => {})}
            className={`bg-red border-1 px-3 rounded-md cursor-pointer hover:bg-red-800 hover:text-white hover:border-main ${classname}`}>{children}</div>

    )
}

export default Button;