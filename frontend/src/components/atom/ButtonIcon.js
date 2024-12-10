import React from 'react'

const ButtonIcon = ({icon, bgColor, onClick}) => {
    return (
        <button className={`rounded-full inline-flex items-center justify-center py-3 px-3 bg-${bgColor} hover:bg-lightGrey/40`} onClick={onClick}>
            {icon}
        </button>
    )
}
export default ButtonIcon