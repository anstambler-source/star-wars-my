const Label = ({children, inside}) => {
    return (
        <label className='bg-gray-400 p-[12px] mt-[6px] mb-[16px] rounded-sm box-border border-[1px] resize-y flex items-center'>{children}
            {inside}
        </label>
    )
}

export default Label;