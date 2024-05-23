import React from 'react'


const InputComponent = ({ placeholder, styleInput,...rest }) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        style={{ border: '1px solid rgb(221, 221, 227)', borderRadius: '5px', ...styleInput }}
        {...rest}
      />
    </div>
  )
}

export default InputComponent