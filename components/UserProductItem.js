import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import gql from 'graphql-tag'

import { QUERY_PRODUCTS } from './Products'
import { ME } from './UserProducts'

const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $description: String
    $imageUrl: String
    $price: Float
  ) {
    updateProduct(
      id: $id
      description: $description
      imageUrl: $imageUrl
      price: $price
    ) {
      id
      description
      price
      imageUrl
    }
  }
`

const UserProductItem = ({ product }) => {
  const [edit, setEdit] = useState(false)
  const [file, setFile] = useState(null)
  const [productData, setProductData] = useState(product)

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: data => {
      console.log(data)
      setProductData(data.updateProduct)
      setEdit(false)
    },
    refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }]
  })

  const handleChange = e =>
    setProductData({ ...productData, [e.target.name]: e.target.value })

  const selectFile = e => {
    const files = e.target.files
    setFile(files[0])
  }

  const uploadFile = async () => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'graphql-basic')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/aut-media/image/upload',
      {
        method: 'post',
        body: data
      }
    )
    const result = await res.json()

    return result.secure_url
  }

  const handleSubmit = async () => {
    if (!file && productData === product) {
      setProductData(product)
      setEdit(false)
      return
    }

    console.log(productData)

    try {
      console.log(file)
      if (file) {
        const url = await uploadFile()
        if (url) {
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: url,
              price: +productData.price
            }
          })
        }
      } else {
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            price: +productData.price
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 1fr 2fr',
        width: '100%',
        borderTop: '1px solid grey',
        borderBottom: '1px solid grey'
      }}
    >
      <div style={{ margin: 'auto' }}>
        {!edit ? (
          <p>{productData.description}</p>
        ) : (
          <input
            type='text'
            name='description'
            value={productData.description}
            onChange={handleChange}
          />
        )}
      </div>
      <div style={{ margin: 'auto' }}>
        {!edit ? (
          <img
            src={productData.imageUrl}
            alt={productData.description}
            width='50px'
          />
        ) : (
          <input type='file' name='file' onChange={selectFile} />
        )}
      </div>
      <div style={{ margin: 'auto' }}>
        {!edit ? (
          <p>{productData.price}</p>
        ) : (
          <input
            type='number'
            name='price'
            value={productData.price}
            onChange={handleChange}
          />
        )}
      </div>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!edit ? (
          <>
            <button
              style={{
                cursor: 'pointer',
                padding: '5px 10px',
                border: 'none',
                background: 'orange',
                margin: '10px'
              }}
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              style={{
                cursor: 'pointer',
                padding: '5px 10px',
                border: 'none',
                background: 'red',
                color: 'white'
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                cursor: 'pointer',
                padding: '5px 10px',
                border: 'none',
                background: 'red',
                margin: '10px',
                color: 'white'
              }}
              onClick={() => {
                setProductData(product)
                setEdit(false)
              }}
            >
              Cancel Edit
            </button>
            <button
              style={{
                cursor: 'pointer',
                padding: '5px 10px',
                border: 'none',
                background: 'green',
                color: 'white'
              }}
              onClick={handleSubmit}
            >
              {loading ? 'Editing...' : 'Confirm Edit'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UserProductItem
