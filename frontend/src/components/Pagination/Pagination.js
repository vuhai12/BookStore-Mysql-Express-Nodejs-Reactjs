import React from 'react'
import "./Pagination.css";
import Button from 'react-bootstrap/Button';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = []
    const pageCount = Math.ceil(totalPosts / postsPerPage)
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    console.log('currentPage',currentPage)

    const handlePre = (currentPage) => {
        if (currentPage == 1) return
        setCurrentPage(currentPage - 1)
    }

    const handleNext = (currentPage) => {
        if (currentPage == pageCount) return
        setCurrentPage(currentPage + 1)
    }

    return (
        <>
            {pageCount >= 1 &&
                <div className='pagination '>
                    <Button className='mx-2' disabled={currentPage == 1} onClick={() => handlePre(currentPage)}>Pre</Button>
                    {pages.map((page, index) => {
                        return (

                            <Button
                                // className={page == currentPage ? 'active mx-2' : 'mx-2'}
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                variant={page == currentPage ? 'warning' :'primary'}
                                className='mx-2'
                            >
                                {page}
                            </Button>

                        )
                    })}
                    <Button className='mx-2' disabled={currentPage == pageCount} onClick={() => handleNext(currentPage)}>Next</Button>
                </div>
            }
        </>

    )
}

export default Pagination