import React, { memo } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";


const SelectQuantity = ({ handleChangeQuantity, quantity, handleQuantity }) => {
    return (
        <div className='flex sm:my-[10px]' >
            <span
                className='cursor-pointer py-[5px] p-[10px] text-center 
                border-solid border-[1px] border-gray-600
                flex items-center justify-center rounded-[5px]
                '
                onClick={() => { handleChangeQuantity('minus') }}
            >
                <FiMinus size={20} />
            </span>
            <span
                className='cursor-pointer py-[5px] px-[15px] text-center 
              border-solid border-[1px] border-gray-600
              flex items-center justify-center mx-[10px] rounded-[5px]
              '>
                {quantity}
            </span>
            <span
                onClick={() => { handleChangeQuantity('plus') }}
                className='cursor-pointer py-[5px] p-[10px] text-center 
                border-solid border-[1px] border-gray-600
                flex items-center justify-center rounded-[5px]
                '
            >
                <FaPlus />
            </span>
        </div>
    )
}

export default memo(SelectQuantity) 