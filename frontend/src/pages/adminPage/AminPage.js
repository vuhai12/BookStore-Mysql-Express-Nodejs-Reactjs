import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import AminBook from '../../components/AminBook/AminBook'
import AminOrder from '../../components/AminOrder/AminOrder'
import AminUser from '../../components/AminUser/AminUser'
import Container from 'react-bootstrap/esm/Container'
import SideBarAdmin from '../../components/SideBarAdmin/SideBarAdmin'
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDeleteNewBookToolkit,
    fetchCreatNewBookToolkit,
    fetchGetListBookToolkit,
    fetchUpdateNewBookToolkit,
} from '../../redux/slides/bookSlice';
import { blobToBase64 } from '../../ultils/blobToBase64';
import Pagination from '../../components/Pagination/Pagination'
import { fetchGetListCategoryToolkit } from '../../redux/slides/userSlice'
import { toast } from 'react-toastify'
import { fetchGetOrdersToolkit } from '../../redux/slides/orderSlice'
// import { fetchGetOrderToolkit } from '../../redux/slides/orderSlice'



const items = [
    {
        id: 1,
        filed: 'users',
        value: 'Quản lý người dùng'
    },
    {
        id: 2,
        filed: 'books',
        value: 'Quản lý sách'
    },
    {
        id: 3,
        filed: 'orders',
        value: 'Quản lý đơn hàng'
    }
]

const optionAdd = [
    {
        id: 1,
        label: 'image',
        inputType: 'input',
        name: 'image',
        value: '',
        file: '',
        required: true,
        type: 'file',
        error: '',
    },
    {
        id: 2,
        label: 'category_code',
        inputType: 'select',
        name: 'category_code',
        value: '',
        code: '',
        items: [],
        required: true,
        error: '',
    },
    {
        id: 3,
        label: 'available',
        inputType: 'input',
        name: 'available',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
    {
        id: 4,
        label: 'title',
        inputType: 'input',
        name: 'title',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
    {
        id: 5,
        label: 'price',
        inputType: 'input',
        name: 'price',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
    {
        id: 6,
        label: 'description',
        inputType: 'input',
        name: 'description',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
]

const optionEdit = [
    {
        id: 1,
        label: 'image',
        inputType: 'input',
        name: 'image',
        value: '',
        file: '',
        required: true,
        type: 'file',
        error: '',
    },
    {
        id: 2,
        label: 'category_code',
        inputType: 'select',
        name: 'category_code',
        code: '',
        value: '',
        items: [],
        required: true,
        error: '',
    },
    {
        id: 3,
        label: 'available',
        inputType: 'input',
        name: 'available',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
    {
        id: 4,
        label: 'title',
        inputType: 'input',
        name: 'title',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
    {
        id: 5,
        label: 'price',
        inputType: 'input',
        name: 'price',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
    {
        id: 6,
        label: 'description',
        inputType: 'input',
        name: 'description',
        value: '',
        required: true,
        type: 'text',
        error: '',
    },
]

const fileds = [
    {
        sort: 'title',
        sort_by: 'DESC'
    },
    {
        sort: 'available',
        sort_by: 'DESC'
    },
    {
        sort: 'category_code',
        sort_by: 'DESC'
    },
    {
        sort: 'price',
        sort_by: 'DESC'
    },
    {
        sort: 'description',
        sort_by: 'DESC'
    },
]

const AminPage = () => {

    const dispatch = useDispatch()
    const [fieldSideBar, setFieldSideBar] = useState('users')
    const [isShowAddModel, setIsShowAddModel] = useState(false)
    const [pageCurent, setCurrentPage] = useState(1)

    const [seclectedId, setSelectedId] = useState('')
    const [optionsAddPopup, setOptionAddPopup] = useState(optionAdd)
    const [optionsEditPopup, setOptionEditPopup] = useState(optionEdit)
    const [optionsFieldSort, setOptionsFieldSort] = useState(fileds)
    const [isShowEditModel, setIsShowEditModel] = useState(false)

    const listBook = useSelector((state) => state.book.listBook)
    const totalBooks = useSelector((state) => state.book.totalBooks)
    const listOrders = useSelector((state) => state.order.listOrders)
    const [searchString, setSearchString] = useState('')

    const [listCategory, setListCategory] = useState([])

    const limit = 3
    useEffect(() => {
        dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString, }))
        dispatch(fetchGetOrdersToolkit())
    }, [pageCurent])

    const openAdd = () => {
        setIsShowAddModel(true)
        dispatch(fetchGetListCategoryToolkit()).then((result) => {
            setListCategory(result.payload)
        })
        optionAdd.map((item) => {
            item.value = ''
            item.error = ''
        })
    }

    const handleCancelEdit = () => {
        setIsShowEditModel(false)
        optionEdit.map((item) => item.value = '')
    }

    const validateAdd = () => {
        let count = 0
        optionsAddPopup.map((item, idx) => {
            if (item.required && !item.value.toString().trim()) {
                item.error = `missing ${item.name}`
                count++
            }
        })
        return count
    }

    const handleCancelAdd = () => {
        setIsShowAddModel(false)
    }

    const handleAdd = () => {
        if (!validateAdd()) {
            const formData = new FormData();

            formData.append('image', optionsAddPopup[0].file);
            formData.append('category_code', optionsAddPopup[1].value);
            formData.append('available', optionsAddPopup[2].value);
            formData.append('title', optionsAddPopup[3].value);
            formData.append('price', optionsAddPopup[4].value);
            formData.append('description', optionsAddPopup[5].value);

            dispatch(fetchCreatNewBookToolkit(formData)).then((result) => {
                if (result.payload.error == 1) {
                    toast.error(result.payload.message, { autoClose: 1500 })
                } else {
                    toast.success(result.payload.message, { autoClose: 500 })
                    dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString, }))
                    setIsShowAddModel(false)
                }
            })
        }
        setOptionAddPopup([...optionAdd])
    }

    const handleStartEdittingPostBook = (book) => {

        setSelectedId(book.id.toString())
        setIsShowEditModel(true)
        dispatch(fetchGetListCategoryToolkit()).then((result) => {
            setListCategory(result.payload)
        })
        setOptionEditPopup([
            {
                id: 1,
                label: 'image',
                inputType: 'input',
                name: 'image',
                // value: blobToBase64(book.image),
                value: (book.image),
                required: true,
                type: 'file',
                error: '',
            },
            {
                id: 2,
                label: 'category_code',
                inputType: 'select',
                name: 'category_code',
                value: (book.categoryData.code),
                required: true,
                error: '',
            },
            {
                id: 3,
                label: 'available',
                inputType: 'input',
                name: 'available',
                value: book.available,
                required: true,
                type: 'text',
                error: '',
            },
            {
                id: 4,
                label: 'title',
                inputType: 'input',
                name: 'title',
                value: book.title,
                required: true,
                type: 'text',
                error: '',
            },
            {
                id: 5,
                label: 'price',
                inputType: 'input',
                name: 'price',
                value: book.price,
                required: true,
                type: 'text',
                error: '',
            },
            {
                id: 6,
                label: 'description',
                inputType: 'input',
                name: 'description',
                value: book.description,
                required: true,
                type: 'text',
                error: '',
            },
        ])
    }

    const validateEdit = () => {
        let count = 0
        optionsEditPopup.map((item) => {
            if (!item.value.toString().trim()) {
                item.error = `missing ${item.name}`
                count++
            }
        })
        return count
    }

    const handleEdit = () => {
        if (!validateEdit()) {
            const formData = new FormData();
            formData.append('bid', seclectedId);
            if (optionsEditPopup[0].file) {
                formData.append('image', optionsEditPopup[0].file);
            }
            formData.append('category_code', optionsEditPopup[1].value);
            formData.append('available', optionsEditPopup[2].value);
            formData.append('title', optionsEditPopup[3].value);
            formData.append('price', optionsEditPopup[4].value);
            formData.append('description', optionsEditPopup[5].value);

            dispatch(fetchUpdateNewBookToolkit(formData)).then((result) => {
                if (result.payload.error == 1) {
                    toast.error(result.payload.message, { autoClose: 1500 })
                } else {
                    toast.success(result.payload.message, { autoClose: 500 })
                    dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString, }))
                    setIsShowEditModel(false)
                }
            })
        }
        setOptionEditPopup([...optionsEditPopup])
    }

    const handleDeleteBook = async (id) => {
        let bid = [id]
        // let filename = [filedata]
        dispatch(fetchDeleteNewBookToolkit({ bid })).then((result) => {
            if (result.payload.error == 1) {
                toast.error(result.payload.message)
            } else {
                toast.success(result.payload.message)
                dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString, }))
            }
        })
    }

    const handleGetValueItem = (fieldSideBar) => {
        setFieldSideBar(fieldSideBar)
    }

    const handleSort = (field) => {
        const selected = optionsFieldSort.find((item) => item.sort == field)
        if (selected.sort_by == 'DESC') {
            selected.sort_by = 'ASC'
        } else {
            selected.sort_by = 'DESC'
        }
        setOptionsFieldSort([...optionsFieldSort])
        dispatch(fetchGetListBookToolkit({ limit, pageCurent, field: selected.sort, sort: selected.sort_by }))
    }

    const renderPage = (fieldSideBar) => {
        switch (fieldSideBar) {
            case 'users':
                return (
                    <>
                        {/* <AminUser
                        /> */}
                    </>

                )
            case 'books':
                return (
                    <>
                        <AminBook
                            listCategory={listCategory}
                            handleSort={handleSort}
                            openAdd={openAdd}
                            listBook={listBook}
                            handleStartEdittingPostBook={handleStartEdittingPostBook}
                            handleDeleteBook={handleDeleteBook}
                            isShowAddModel={isShowAddModel}
                            optionsAddPopup={optionsAddPopup}
                            handleAdd={handleAdd}
                            handleCancelAdd={handleCancelAdd}
                            isShowEditModel={isShowEditModel}
                            optionsEditPopup={optionsEditPopup}
                            handleCancelEdit={handleCancelEdit}
                            handleEdit={handleEdit}
                            optionsFieldSort={optionsFieldSort}
                        />
                        <Pagination
                            totalPosts={totalBooks}
                            postsPerPage={limit}
                            setCurrentPage={setCurrentPage}
                            currentPage={pageCurent}
                        />
                    </>

                )
            case 'orders':
                return (
                    <AminOrder
                        listOrders={listOrders}
                    />
                )
            default:
                return (
                    <></>
                )
        }
    }

    // return (
    //     <Container>
    //         <Row style={{ marginTop: '20px' }}>
    //             <Col lg={2} style={{ background: 'white' }}>
    //                 <SideBarAdmin
    //                     listItems={items}
    //                     fieldSideBar={fieldSideBar}
    //                     handleGetValueItem={handleGetValueItem}
    //                 />
    //             </Col>
    //             <Col lg={10} >
    //                 {renderPage(fieldSideBar)}
    //             </Col>
    //         </Row>
    //     </Container>
    // )
}

export default AminPage