import React, { useEffect, useState, useContext } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchGetListCategoryToolkit } from '../../redux/slides/userSlice';
import { fetchGetListBookToolkit } from '../../redux/slides/bookSlice';
import BookCard from '../../components/BookCard/BookCard';


const FeaturedBook = () => {

  const dispatch = useDispatch()
  const limit = 12
  const listBook = useSelector((state) => state.book.listBook)
  const totalBooks = useSelector((state) => state.user.totalBooks)
  const [pageCurent, setCurrentPage] = useState(1)
  const [searchString, setSearchString] = useState('')
  const params = useParams();
  const category = params.code

  useEffect(() => {
    dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString, category }))
    dispatch(fetchGetListCategoryToolkit())
  }, [pageCurent, searchString, category])
  return (
    <>
      {/* <div  className='bg-white rounded-[5px] p-[20px] fixed w-[80%] right-0'> */}
    
      <div  className=' rounded-[5px] p-[10px]  w-[100%] mt-[60px] bg-white sm:ml-[240px]'>
        <h5 className='p-[5px]'>Sách</h5>
        <div className='flex flex-wrap'>
          {
            listBook && listBook?.length > 0 && listBook?.map((item, index) => {
              return (
                <div className='basis-[100%] p-[5px] sm:basis-[25%]' key={index}>
                  <BookCard
                    // image={blobToBase64(item.image)}
                    props={item}
                    handleViewBookDetail={() => handleViewBookDetail(item)}
                  />
                </div>
              )
            })
          }
        </div>
        <Pagination
          totalPosts={totalBooks}
          postsPerPage={limit}
          setCurrentPage={setCurrentPage}
          currentPage={pageCurent}
        />
      </div>
    </>
  )
}

export default FeaturedBook