import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetListCategoryToolkit } from '../../redux/slides/userSlice';
import FeaturedBook from '../book/FeaturedBook'
import SliderComponent from '../../components/SliderComponent/SliderComponent';

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
                {/* <div className='flex z-9 mt-[100px]'> */}
                <SideBar
                    listCategory={listCategory}
                    titleSideBar={titleSideBar}
                />


                <FeaturedBook />


                {/* <div className='bg-slate-500'>cbsb</div>
                <div className='bg-neutral-900 w-full ml-[500px]'>cbsb</div> */}
            </div>

        </>
    )
}

export default Home

