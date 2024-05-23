import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListCategoryToolkit } from '../../redux/slides/userSlice';

import FeaturedBook from '../book/FeaturedBook'

const Home = () => {
    const listCategory = useSelector((state) => state.user.listCategory)
    const titleSideBar = 'Danh mục'

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetListCategoryToolkit())
    }, [])
    
    return (
        <>
            <Container >
               
                <Row>
                    <Col lg={2}>
                        <SideBar
                            listCategory={listCategory}
                            titleSideBar={titleSideBar}
                        />
                    </Col>
                    <Col lg={10}>
                        <FeaturedBook />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home

