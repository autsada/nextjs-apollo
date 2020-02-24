import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { QUERY_PRODUCTS } from './Products'

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

const ManageProduct = () => {
  const [productData, setProductData] = useState({
    description: '',
    imageUrl: '',
    price: ''
  })

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
    variables: { ...productData, price: +productData.price },
    refetchQueries: [{ query: QUERY_PRODUCTS }]
  })

  const handleChange = e =>
    setProductData({ ...productData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const result = await createProduct()
      console.log(result)
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
          type='text'
          name='imageUrl'
          placeholder='Product Image'
          value={productData.imageUrl}
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
        <button
          style={{
            margin: '5px',
            padding: '10px',
            background: 'teal',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px'
          }}
          type='submit'
          disabled={loading}
        >
          Submit{loading ? 'ting...' : ''}
        </button>
      </form>

      <div style={{ width: '30%', margin: 'auto' }}>
        {error && (
          <p style={{ color: 'red' }}>{error.graphQLErrors[0].message}</p>
        )}

        {(!productData.description ||
          !productData.imageUrl ||
          !productData.price) && (
          <p style={{ color: 'red' }}>Please fill in all required fields</p>
        )}
      </div>
    </div>
  )
}

export default ManageProduct
