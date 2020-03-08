import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import gql from 'graphql-tag'

import { ME } from './Nav'

// const UPDATE_PRODUCT = gql`
//   mutation UPDATE_PRODUCT(
//     $id: ID!
//     $description: String
//     $imageUrl: String
//     $price: Float
//   ) {
//     updateProduct(
//       id: $id
//       description: $description
//       imageUrl: $imageUrl
//       price: $price
//     ) {
//       id
//       description
//       price
//       imageUrl
//     }
//   }
// `

const CartItem = ({ cart }) => {
  //   const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
  //     onCompleted: data => {
  //       console.log(data)
  //       setProductData(data.updateProduct)
  //       setEdit(false)
  //     },
  //     refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }]
  //   })

  //   const handleSubmit = async () => {
  //     if (!file && productData === product) {
  //       setProductData(product)
  //       setEdit(false)
  //       return
  //     }

  //     console.log(productData)

  //     try {
  //       console.log(file)
  //       if (file) {
  //         const url = await uploadFile()
  //         if (url) {
  //           await updateProduct({
  //             variables: {
  //               ...productData,
  //               imageUrl: url,
  //               price: +productData.price
  //             }
  //           })
  //         }
  //       } else {
  //         await updateProduct({
  //           variables: {
  //             ...productData,
  //             imageUrl: productData.imageUrl,
  //             price: +productData.price
  //           }
  //         })
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr',
        width: '100%',
        borderTop: '1px solid grey',
        borderBottom: '1px solid grey'
      }}
    >
      <div style={{ margin: 'auto' }}>
        <p>{cart.product.description}</p>
      </div>
      <div style={{ margin: 'auto' }}>
        <img
          src={cart.product.imageUrl}
          alt={cart.product.description}
          width='50px'
        />
      </div>
      <div style={{ margin: 'auto' }}>
        <p>{cart.product.price}</p>
      </div>
      <div style={{ margin: 'auto' }}>
        <p>{cart.quantity}</p>
      </div>
      <div style={{ margin: 'auto' }}>
        <p>{cart.quantity * cart.product.price}</p>
      </div>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <button
          style={{
            cursor: 'pointer',
            padding: '5px 10px',
            border: 'none',
            background: 'red',
            color: 'white'
          }}
          //   onClick={handleSubmit}
        >
          Delete
          {/* {loading ? 'Editing...' : 'Confirm Edit'} */}
        </button>
      </div>
    </div>
  )
}

export default CartItem
