import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Router from 'next/router'

import { AuthContext } from '../appState/AuthProvider'
import { ME } from './Nav'

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART($id: ID!) {
    addToCart(id: $id) {
      id
      product {
        id
        description
        imageUrl
        price
      }
      quantity
    }
  }
`

const ProductItem = ({ prod }) => {
  const { user } = useContext(AuthContext)

  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
    onCompleted: data => {
      console.log(data)
    },
    refetchQueries: [{ query: ME }]
  })

  const handleAddToCart = async id => {
    console.log(id)
    if (!user) {
      return Router.push('/signin')
    }
    await addToCart({ variables: { id } })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
        border: 'solid 1px black',
        padding: '10px'
      }}
    >
      <Link href='/products/[productId]' as={`/products/${prod.id}`}>
        <a>
          <img src={prod.imageUrl} alt={prod.description} width='250px' />
        </a>
      </Link>
      <h3>{prod.description}</h3>
      <h4>{prod.price} THB</h4>
      {user && user.id === prod.user.id ? (
        <button
          style={{
            background: 'red',
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            border: 'none'
          }}
          onClick={() => Router.push('/manageProduct')}
        >
          Manage Product
        </button>
      ) : (
        <button
          style={{
            background: 'green',
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            border: 'none'
          }}
          onClick={() => handleAddToCart(prod.id)}
        >
          {loading ? 'Processing....' : 'Add to Cart'}
        </button>
      )}
    </div>
  )
}

export default ProductItem
