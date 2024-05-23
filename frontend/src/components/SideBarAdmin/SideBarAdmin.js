import React from 'react'
import { WrapperSideBar } from './style';

const SideBarAdmin = ({ listItems, handleGetValueItem, fieldSideBar }) => {
    return (
        <>
            <p style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '700', lineHeight: '150%' }}>Admin</p>
            {listItems.map((item) => {
                return (
                    <WrapperSideBar
                        fieldSideBar={fieldSideBar}
                        field={item.filed}
                        key={item.id}
                        onClick={() => handleGetValueItem(item.filed)}
                    >
                        {item.value}
                    </WrapperSideBar>
                )
            })}
        </>
    )
}

export default SideBarAdmin