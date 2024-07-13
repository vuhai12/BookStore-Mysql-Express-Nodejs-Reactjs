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
                <div className='pagination text-center flex justify-center'>
                    <button className='' disabled={currentPage == 1} onClick={() => handlePre(currentPage)}>Pre</button>
                    {pages.map((page, index) => {
                        return (

                            <button
                                className={page == currentPage ? 'w-[30px] h-[30px] mx-3 border-[1px] border-solid border-gray-500 rounded-[5px] p-[8px] flex flex-row items-center' : 'mx-3'}
                                key={index}
                                onClick={() => setCurrentPage(page)}
                               
                                
                            >
                                {page}
                            </button>

                        )
                    })}
                    <button className='mx-2' disabled={currentPage == pageCount} onClick={() => handleNext(currentPage)}>Next</button>
                </div>
            }
        </>

    )
}

export default Pagination