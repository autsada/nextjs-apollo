import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ME } from './Nav'

const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(id: $id) {
      id
    }
  }
`

const CartItem = ({ cart }) => {
  const [deleteCart, { loading, error }] = useMutation(DELETE_CART, {
    onCompleted: data => {
      console.log(data)
    },
    refetchQueries: [{ query: ME }]
  })

  const handleSubmit = async () => {
    try {
      await deleteCart({ variables: { id: cart.id } })
    } catch (error) {
      console.log(error)
    }
  }

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
          onClick={handleSubmit}
        >
          {loading ? 'Deleting...' : error ? 'Error' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default CartItem
