import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';

const Search = ({ onKeySearch }) => {
    const [keyWord, setKeyWord] = useState('')
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            onKeySearch(keyWord)
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [keyWord])

    const handleOnchangeSearch = (e) => {
        setKeyWord(e.target.value)
    }
    return (
        <Form.Control value={keyWord} placeholder="Search" onChange={(e) => handleOnchangeSearch(e)} />
    )
}

export default Search