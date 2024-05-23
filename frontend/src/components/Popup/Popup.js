import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AlertComponent from '../Alert/Alert'
import { fileToBase64 } from '../../ultils/toBase64';
import ImageDefault from '../../assets/image_default.jpg'

const Popup = ({ isShow, options, onCancel, onAction, subActionText, actionText, listCategory, role }) => {

  const [items, setItems] = useState(options)
  const [checked, setChecked] = useState('R1')

  const handleOnchange = async (option, e) => {
    const item = items?.find((item) => option.id === item.id);
    if (item.type == 'file') {

      item.value = URL.createObjectURL(e.target.files[0])
      item.file = e.target.files[0]

    } else if (item.inputType == 'select') {
      item.value = e.target.value

      if (e.target.value == 'default') {
        item.value = ''
      }
    } else if (item.type == 'radio') {
      item.value = checked
    }
    else {
      item.value = e.target.value;
    }
    setItems([...items])
    items.map((item) => {
      if (item.value !== "") {
        item.error = ''
      }
    })
  }

  return (
    <div>
      <Modal show={isShow} onHide={onCancel}>
        <Modal.Body>
          {items.map((option) => {
            return (
              <div key={option.id}>
                <label>{option.label}</label>
                {option.inputType == 'input' &&
                  <div>
                    {option.type == 'file' ?
                      <img alt='image'
                        src={(option.value != '' ? (option.value) : ImageDefault)
                        }
                        style={{ height: '60px' }} /> : ''}
                    {option.type == 'radio' ?
                      role.map((item) => {
                        return (
                          <div key={item.id} style={{ display: 'inline-block' }}>
                            {item.value}
                            <input
                              checked={checked === item.code}
                              style={{ padding: '8px 10px', margin: '10px', border: '2px solid #ccc', borderRadius: '4px', display: 'inline-block' }}
                              type='radio'
                              onChange={() => setChecked(item.code)}
                            />
                          </div>
                        )
                      }) : <input
                        style={{ width: '100%', padding: '8px 10px', margin: '6px 0', border: '2px solid #ccc', borderRadius: '4px' }}
                        name={option.name}
                        defaultValue={option.type == 'file' ? '' : option?.value}
                        type={option.type}
                        onChange={(e) => handleOnchange(option, e)}
                      />
                    }
                    {option.error && <AlertComponent error={true} message={option.error} />}
                  </div>
                }
                {option.inputType == 'select' &&
                  <div>
                    <select
                      value={option.value}
                      onChange={(e) => handleOnchange(option, e)}
                      style={{ width: '100%', padding: '8px 10px', margin: '6px 0px', border: '2px solid rgb(204,204,204)', borderRadius: '4px' }}>
                      <option value='default'>-- category --</option>
                      {listCategory.map((item) => {
                        return (
                          <option value={item.code} lable={item.value} style={{ height: '100px', display: 'inline-block' }}>{item.value}</option>
                        )
                      })}
                    </select>
                    {option.error && <AlertComponent error={true} message={option.error} />}
                  </div>
                }
              </div>
            )
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            {subActionText}
          </Button>
          <Button variant="primary" onClick={onAction}>
            {actionText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Popup