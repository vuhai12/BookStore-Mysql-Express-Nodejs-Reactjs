import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Popup from '../Popup/Popup';
import { blobToBase64 } from '../../ultils/blobToBase64';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";

const AminBook = ({
    openAdd,
    listBook,
    handleStartEdittingPostBook,
    handleDeleteBook,
    isShowAddModel,
    optionsAddPopup,
    handleAdd,
    handleCancelAdd,
    isShowEditModel,
    optionsEditPopup,
    handleCancelEdit,
    handleEdit,
    handleSort,
    optionsFieldSort,
    listCategory,
}) => {
    return (
        <>
            <Container>
                <Stack direction="horizontal" gap={2} >
                    <ButtonComponent
                        onClick={openAdd}
                        textButton='ADD'
                        styleButton={{ padding: '10px', background: 'blue' }}
                        styleTextButton={{ color: 'white' }}
                    />
                </Stack>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr style={{ width: '100%' }}>
                            <th style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>No</span>
                            </th>
                            <th>Book</th>
                            <th onClick={() => handleSort('title')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Title</span>
                                {optionsFieldSort[0].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th onClick={() => handleSort('available')}>
                                <span>Available</span>
                                {optionsFieldSort[1].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th onClick={() => handleSort('category_code')}>
                                <span>Category</span>
                                {optionsFieldSort[2].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th onClick={() => handleSort('price')}>
                                <span>Price</span>
                                {optionsFieldSort[3].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th onClick={() => handleSort('description')}>
                                <span>Description</span>
                                {optionsFieldSort[4].sort_by == 'DESC' ? <FaSortDown /> : <FaSortUp />}
                            </th>
                            <th colSpan={3} className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBook && listBook.length > 0 && listBook.map((item, idx) => {
                            return (
                                <tr key={item.id}>
                                    <td>{idx+1}</td>
                                    {/* <td><img style={{ width: '50px', height: '50px' }} src={blobToBase64(item.image)}></img></td> */}
                                    <td><img style={{ width: '50px', height: '50px' }} src={(item.image)}></img></td>
                                    <td>{item.title}</td>
                                    <td>{item.available}</td>
                                    <td>{item.categoryData.value}</td>
                                    <td>{item.price.toLocaleString()} VND</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <ButtonComponent
                                            onClick={() => handleStartEdittingPostBook(item)}
                                            textButton='EDIT'
                                            styleButton={{ padding: '10px', background: 'green' }}
                                            styleTextButton={{ color: 'white' }}
                                        />
                                    </td>
                                    <td>
                                        <ButtonComponent
                                            onClick={() => handleDeleteBook(item.id)}
                                            textButton='DELETE'
                                            styleButton={{ padding: '10px', background: 'red' }}
                                            styleTextButton={{ color: 'white' }}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {isShowAddModel &&
                    <Popup
                        isShow={isShowAddModel}
                        options={optionsAddPopup}
                        onAction={handleAdd}
                        onCancel={handleCancelAdd}
                        actionText={'Save'}
                        subActionText={'Close'}
                        listCategory={listCategory}
                    />
                }
                {isShowEditModel &&
                    <Popup
                        isShow={isShowEditModel}
                        options={optionsEditPopup}
                        onAction={handleEdit}
                        onCancel={handleCancelEdit}
                        actionText={'Save'}
                        subActionText={'Close'}
                        listCategory={listCategory}
                    />
                }
            </Container>
        </>
    )
}

export default AminBook