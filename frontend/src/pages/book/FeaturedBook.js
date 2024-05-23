import Container from 'react-bootstrap/Container';
import React, { useEffect, useState, useContext } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { blobToBase64 } from '../../ultils/blobToBase64';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  console.log('listBook',listBook)
  return (
    <>
      <Container style={{ background: 'white', borderRadius: '5px' }}>
        <h5 className='mt-3'>Sách</h5>
        <Row>
          {
            listBook && listBook?.length > 0 && listBook?.map((item, index) => {
              return (
                <Col lg={3} key={index}>

                  <BookCard
                    // id={item.id}
                    // image={blobToBase64(item.image)}
                    props={item}
                    // image={(item.image)}
                    // title={item.title}
                    // price={item.price}
                    // available={item.available}
                    // description={item.description}
                    handleViewBookDetail={() => handleViewBookDetail(item)}
                  />
                </Col>
              )
            })
          }
        </Row>
        <Pagination
          totalPosts={totalBooks}
          postsPerPage={limit}
          setCurrentPage={setCurrentPage}
          currentPage={pageCurent}
        />
      </Container>
    </>
  )
}

export default FeaturedBook