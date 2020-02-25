import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import gql from 'graphql-tag'

import { QUERY_PRODUCTS } from './Products'
import { ME } from './UserProducts'

const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT(
    $description: String!
    $imageUrl: String!
    $price: Float!
  ) {
    createProduct(
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
//
const ManageProduct = () => {
  const [file, setFile] = useState(null)
  const [productData, setProductData] = useState({
    description: '',
    imageUrl: '',
    price: ''
  })

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
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

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const url = await uploadFile()

      if (url) {
        const result = await createProduct({
          variables: {
            ...productData,
            imageUrl: url,
            price: +productData.price
          }
        })
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ margin: '100px' }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          width: '30%'
        }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ margin: '5px', height: '30px' }}
          type='text'
          name='description'
          placeholder='Product Description'
          value={productData.description}
          onChange={handleChange}
        />

        <input
          style={{ margin: '5px', height: '30px' }}
          type='number'
          name='price'
          placeholder='Product Price'
          value={productData.price}
          onChange={handleChange}
        />

        <input
          style={{ margin: '5px', height: '30px' }}
          type='file'
          name='file'
          placeholder='Product Image'
          // value={productData.imageUrl}
          onChange={selectFile}
        />

        <button
          style={{
            margin: '5px',
            padding: '10px',
            background: 'teal',
            color: 'white',
            border: 'none',
            cursor:
              !productData.description || !file || !productData.price || loading
                ? 'not-allowed'
                : 'pointer',
            fontSize: '18px'
          }}
          type='submit'
          disabled={
            !productData.description || !file || !productData.price || loading
          }
        >
          Submit{loading ? 'ting...' : ''}
        </button>
      </form>

      <div style={{ width: '30%', margin: 'auto' }}>
        {error && (
          <p style={{ color: 'red' }}>{error.graphQLErrors[0].message}</p>
        )}

        {(!productData.description || !file || !productData.price) && (
          <p style={{ color: 'red' }}>Please fill in all required fields</p>
        )}
      </div>
    </div>
  )
}

export default ManageProduct
