import React from 'react'

const Button = ({ text, bgColor, textColor, onClick  }) => {
    return (
        <button className={`bg-${bgColor} dark:bg-dark-2 rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-${textColor} hover:bg-${bgColor}/90 disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5`} onClick={onClick}>
            {text}
        </button>
    )
}
export default Button