import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { ME } from './UserProducts'
import { ADD_TO_CART } from './ProductItem'
import { AuthContext } from '../appState/AuthProvider'

const QUERY_PRODUCT = gql`
  query QUERY_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      description
      price
      imageUrl
    }
  }
`

const Product = () => {
  const route = useRouter()
  const { user } = useContext(AuthContext)

  const { data, loading, error } = useQuery(QUERY_PRODUCT, {
    variables: { id: route.query.productId }
  })

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted: data => {
      console.log(data)
    },
    refetchQueries: [{ query: ME }]
  })

  const handleAddToCart = async id => {
    if (!user) {
      return Router.push('/signin')
    }
    await addToCart({ variables: { id } })
  }

  if (error) return <p>Something went wrong, please try again.</p>

  if (loading) return <p>Loading ...</p>

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px'
      }}
    >
      <img
        src={data.product.imageUrl}
        alt={data.product.description}
        width='350'
      />
      <h1>{data.product.description}</h1>
      <h3>{data.product.price}</h3>
      <button
        style={{
          background: 'green',
          color: 'white',
          padding: '10px',
          cursor: 'pointer',
          border: 'none'
        }}
        onClick={() => handleAddToCart(data.product.id)}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default Product
