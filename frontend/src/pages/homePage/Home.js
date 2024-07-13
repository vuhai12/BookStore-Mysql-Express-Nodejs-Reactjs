import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar'
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
            <div className='flex z-9'>
                <SideBar
                    listCategory={listCategory}
                    titleSideBar={titleSideBar}
                />
                <FeaturedBook />
            </div>
          
        </>
    )
}

export default Home

