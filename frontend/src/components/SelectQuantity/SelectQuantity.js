import React, { memo } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";


const SelectQuantity = ({ handleChangeQuantity, quantity, handleQuantity }) => {
    return (
        <div className='flex' >
            <span
                className='cursor-pointer w-[30px] h-[30px] text-center 
                border-solid border-[1px] border-gray-600
                flex items-center justify-center
                '
                onClick={() => { handleChangeQuantity('minus') }}
            >
                <FiMinus size={20} />
            </span>
            <span
                className='cursor-pointer w-[30px] h-[30px] text-center 
              border-solid border-[1px] border-gray-600
              flex items-center justify-center
              '>
                {quantity}
            </span>
            <span
                onClick={() => { handleChangeQuantity('plus') }}
                className='cursor-pointer w-[30px] h-[30px] text-center 
                border-solid border-[1px] border-gray-600
                flex items-center justify-center
                '
            >
                <FaPlus />
            </span>
        </div>
    )
}

export default memo(SelectQuantity) 