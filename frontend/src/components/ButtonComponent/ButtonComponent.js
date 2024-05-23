import React from 'react'

const ButtonComponent = ({ textButton, styleTextButton, styleButton, icon, ...rest }) => {
    return (
        <button
            style={{
                borderRadius: '5px',
                border: '1px solid rgb(221, 221, 227)',
                ...styleButton,
            }}
            {...rest}
        >
            {icon}
            <span style={{ ...styleTextButton }}>{textButton}</span>
        </button>
    )
}

export default ButtonComponent