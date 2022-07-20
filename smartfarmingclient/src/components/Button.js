import React from 'react'

export const Button = ({onClick, text, color, size, textColor, icon, textSize, type="submit"}) => {
  return (
    <button type={type} className={`${size} ${color}  p-2 rounded ${textColor} font-bold flex justify-center ${textSize} items-center gap-x-1`} onClick={onClick}>
      {icon}
        {text}
    </button>
  )
}
