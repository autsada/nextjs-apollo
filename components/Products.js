import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import ProductItem from './ProductItem'

export const QUERY_PRODUCTS = gql`
  query {
    products {
      id
      description
      price
      imageUrl
      user {
        id
      }
    }
  }
`

const Products = () => {
  const { data, loading, error } = useQuery(QUERY_PRODUCTS)

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '40px',
        gridGap: '10px'
      }}
    >
      {data.products.map(prod => (
        <ProductItem key={prod.id} prod={prod} />
      ))}
    </div>
  )
}

export default Products
