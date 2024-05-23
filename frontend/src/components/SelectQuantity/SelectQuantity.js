import React, { memo } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";


const SelectQuantity = ({ handleChangeQuantity, quantity, handleQuantity }) => {
    return (
        <div style={{ display: 'flex' }}>
            <span
                onClick={() => { handleChangeQuantity('minus') }}
                style={{ cursor: 'pointer', border: '1px solid gray', marginRight: '15px', width: '50px', height: '50px', lineHeight: '50px', display: 'inline-block', textAlign: 'center' }}>
                <FiMinus />
            </span>
            <span
                style={{ border: '1px solid gray', fontWeight: 'bold', marginRight: '15px', width: '50px', height: '50px', lineHeight: '50px', display: 'inline-block', textAlign: 'center' }}>
                {quantity}
            </span>
            <span
                onClick={() => { handleChangeQuantity('plus') }}
                style={{ cursor: 'pointer', border: '1px solid gray', marginRight: '15px', width: '50px', height: '50px', lineHeight: '50px', display: 'inline-block', textAlign: 'center' }}>
                <FaPlus />
            </span>
        </div>
    )
}

export default memo(SelectQuantity) 