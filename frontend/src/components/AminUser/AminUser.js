import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../../components/Popup/Popup';
import { blobToBase64 } from '../../ultils/blobToBase64';
import ImageDefault from '../../assets/image_default.jpg'
import { fetchDeleteNewUserToolkit, fetchGetListUserToolkit, fetchUpdateNewUserToolkit, fetchCreatNewUserToolkit, } from '../../redux/slides/userSlice';
import { toast } from 'react-toastify'
// import Pagination from './Pagination';
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { exportExcel } from '../../ultils/commonUltils';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';


const optionAddUser = [
    {
        id: 1,
        label: 'Avatar',
        inputType: 'input',
        name: 'Avatar',
        value: '',
        file: '',
        required: true,
        type: 'file',
        error: ''
    },
    {
        id: 2,
        label: 'Name',
        inputType: 'input',
        name: 'Name',
        value: '',
        required: true,
        type: 'text',
        error: ''
    },
    {
        id: 3,
        label: 'Email',
        inputType: 'input',
        name: 'Email',
        value: '',
        required: true,
        type: 'text',
        error: ''
    },
    {
        id: 4,
        label: 'Role',
        inputType: 'input',
        name: 'Role',
        value: '',
        required: true,
        type: 'radio',
        error: ''
    },
    {
        id: 5,
        label: 'Password',
        inputType: 'input',
        name: 'Password',
        value: '',
        required: true,
        type: 'password',
        error: ''
    }
]

const optionEditUser = [
    {
        id: 1,
        label: 'Avatar',
        inputType: 'input',
        name: 'Avatar',
        value: '',
        file: '',
        required: true,
        type: 'file',
        error: ''
    },
    {
        id: 2,
        label: 'Name',
        inputType: 'input',
        name: 'Name',
        value: '',
        required: true,
        type: 'text',
        error: ''
    },
    {
        id: 3,
        label: 'Email',
        inputType: 'input',
        name: 'Email',
        value: '',
        required: true,
        type: 'text',
        error: ''
    },
    {
        id: 4,
        label: 'Role',
        inputType: 'input',
        name: 'Role',
        value: '',
        required: true,
        type: 'radio',
        error: ''
    }
]

const fileds = [
    {
        sort: 'name',
        sort_by: 'DESC'
    },
    {
        sort: 'email',
        sort_by: 'DESC'
    },
    {
        sort: 'role_code',
        sort_by: 'DESC'
    },
]

const role = [
    {
        id:1,
        code:'R1',
        value:'Admin'
    },  
    {
        id:2,
        code:'R2',
        value:'User'
    },  
    // {
    //     id:3,
    //     code:'R3',
    //     value:'Guest'
    // },
]

const AminUser = () => {
    const dispatch = useDispatch()
    const listUsers = useSelector((state) => state.user.listUsers)

    const [isShowAddUser, setIsShowAddUser] = useState(false)
    const [isShowEditUser, setIsShowEditUser] = useState(false)

    const [seclectedUserId, setSeclectedUserId] = useState(0)

    const [optionsAddUserPopup, setOptionsAddUserPopup] = useState(optionAddUser)
    const [optionsEditUserPopup, setOptionsEditUserPopup] = useState(optionEditUser)
    const [optionsFiledSort, setOptionsFiledSort] = useState(fileds)

    const [pageCurent, setCurrentPage] = useState(1)

    const limit = 3
    const searchString = ''

    useEffect(() => {
        dispatch(fetchGetListUserToolkit({ limit, pageCurent, searchString }))
    }, [pageCurent])

    const openAdd = () => {
        setIsShowAddUser(true)
        optionsAddUserPopup.map((item) => {
            item.value = ''
            item.error = ''
        })
    }

    const validateAdd = () => {
        let count = 0
        optionsAddUserPopup.map((item, idx) => {
            if (item.required && !item.value.toString().trim()) {
                item.error = `missing ${item.name}`
                count++
            }
        })
        return count
    }

    const handleAdd = () => {
        if (!validateAdd()) {

            const formData = new FormData();
            if (optionsAddUserPopup[0].file) {
                formData.append('avatar', optionsAddUserPopup[0].file);
            }

            formData.append('name', optionsAddUserPopup[1].value);
            formData.append('email', optionsAddUserPopup[2].value);
            formData.append('role_code', optionsAddUserPopup[3].value);
            formData.append('password', optionsAddUserPopup[4].value);

            dispatch(fetchCreatNewUserToolkit(formData)).then((result) => {
                if (result.payload.error == 1) {
                    toast.error(result.payload.message, { autoClose: 1500 })
                } else {
                    toast.success(result.payload.message, { autoClose: 500 })
                    dispatch(fetchGetListUserToolkit({ limit, pageCurent, searchString, }))
                    setIsShowAddUser(false)
                }
            })

        }
        setOptionsAddUserPopup([...optionAddUser])
    }

    const handleCancelAdd = () => {
        setIsShowAddUser(false)
    }

    const validateEditUser = () => {
        let count = 0
        optionsEditUserPopup.map((item) => {
            if (!item.value.toString().trim()) {
                item.error = `missing ${item.name}`
                count++
            }
        })
        return count
    }

    const handleEdit = () => {

        if (!validateEditUser()) {
            const formData = new FormData();
            formData.append('bid', seclectedUserId);
            if (optionsEditUserPopup[0].file) {
                formData.append('avatar', optionsEditUserPopup[0].file);
            }
            formData.append('name', optionsEditUserPopup[1].value);
            formData.append('email', optionsEditUserPopup[2].value);
            formData.append('role_code', optionsEditUserPopup[3].value);

            dispatch(fetchUpdateNewUserToolkit(formData)).then((result) => {
                if (result.payload.error == 1) {
                    toast.error(result.payload.message, { autoClose: 1500 })
                } else {
                    toast.success(result.payload.message, { autoClose: 500 })
                    dispatch(fetchGetListUserToolkit({ limit, pageCurent, searchString, }))
                    setIsShowEditUser(false)
                }
            })
        }
        setOptionsEditUserPopup([...optionsEditUserPopup])
    }

    const handleCancelEdit = () => {
        setIsShowEditUser(false)
    }

    const handleOpenEditUser = (user) => {
        setIsShowEditUser(true)
        setSeclectedUserId(user.id)
        setOptionsEditUserPopup([
            {
                id: 1,
                label: '',
                inputType: 'input',
                name: 'avatar',
                // value: blobToBase64(user.avatar),
                value: (user.avatar),
                required: true,
                type: 'file',
                error: '',
            },
            {
                id: 2,
                label: '',
                inputType: 'input',
                name: 'name',
                value: user.name,
                required: true,
                type: 'text',
                error: '',
            },
            {
                id: 3,
                label: '',
                inputType: 'input',
                name: 'email',
                value: user.email,
                required: true,
                type: 'text',
                error: '',
            },
            {
                id: 4,
                label: '',
                inputType: 'input',
                name: 'role',
                value: user.role_code,
                required: true,
                type: 'text',
                error: '',
            },
        ])
    }

    const handleDeleteUser = (id) => {
        let bid = [id]
        // let filename = [filedata]
        dispatch(fetchDeleteNewUserToolkit({ bid })).then((result) => {
            if (result.payload.error == 1) {
                toast.error(result.payload.message)
            } else {
                toast.success(result.payload.message)
                dispatch(fetchGetListUserToolkit({ limit, pageCurent, searchString, }))
            }
        })
    }

    const handleSort = (field) => {
        setOptionsFiledSort([...optionsFiledSort])
        const selected = optionsFiledSort.find((item) => item.sort == field)
        if (selected.sort_by == 'DESC') {
            selected.sort_by = 'ASC'
        } else {
            selected.sort_by = 'DESC'
        }
        dispatch(fetchGetListUserToolkit({ limit, pageCurent, field: selected.sort, sort: selected.sort_by }))
    }

    const handleExportData = async () => {
        const listData = listUsers.map((item) => {
            let { address, avatar, createdAt, password, refresh_token, updatedAt, ...rest } = item
            return rest
        })
        await exportExcel(listData, "danh sách User", "List User")
    }

    const handleSearch = (searchString) => {
        dispatch(fetchGetListUserToolkit({ limit, pageCurent, searchString }))
    }

    return (
        <>
            <Container>
                <Stack direction="horizontal" gap={2} >
                    <Button onClick={openAdd}>Add</Button>
                    <Button variant='success' onClick={handleExportData}>Export</Button>
                </Stack>
                <Search onKeySearch={handleSearch} />
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            {/* <th><input type="checkbox" /></th> */}
                            <th>No</th>
                            <th>Avatar</th>
                            <th onClick={() => handleSort('name')}>Name
                                {optionsFiledSort[0].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th onClick={() => handleSort('email')}>Email
                                {optionsFiledSort[1].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th onClick={() => handleSort('role_code')}>Role
                                {optionsFiledSort[2].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th colSpan={3} className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                                return (
                                    <tr key={`user${index}`}>
                                        {/* <td><input type="checkbox" /></td> */}
                                        <td>{index + 1}</td>
                                        {/* <td><img style={{ width: '50px', height: '50px' }} src={item?.avatar != null ? blobToBase64(item?.avatar) : ImageDefault}></img></td> */}
                                        <td><img style={{ width: '50px', height: '50px' }} src={item?.avatar != null ? (item?.avatar) : ImageDefault}></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role_code}</td>
                                        <td> <Button variant="primary" onClick={() => handleOpenEditUser(item)}>EDIT</Button></td>
                                        <td> <Button variant="danger" onClick={() => handleDeleteUser(item.id)}>DELETE</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
            <Pagination
                totalPosts={5}
                postsPerPage={limit}
                setCurrentPage={setCurrentPage}
                currentPage={pageCurent}
            />
            {isShowAddUser &&
                <Popup
                    isShow={isShowAddUser}
                    options={optionsAddUserPopup}
                    onAction={handleAdd}
                    onCancel={handleCancelAdd}
                    actionText={'Save'}
                    subActionText={'Close'}
                    role={role}
                />
            }
            {isShowEditUser &&
                <Popup
                    isShow={isShowEditUser}
                    options={optionsEditUserPopup}
                    onAction={handleEdit}
                    onCancel={handleCancelEdit}
                    actionText={'Save'}
                    subActionText={'Close'}
                    role={role}
                />
            }
        </>
    )
}

export default AminUser