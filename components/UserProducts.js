import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import UserProductItem from './UserProductItem'

export const ME = gql`
  query ME {
    user {
      id
      name
      email
      products {
        id
        description
        imageUrl
        price
      }
      carts {
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
  }
`

const UserProducts = () => {
  const { data, loading, error } = useQuery(ME, { fetchPolicy: 'no-cache' })

  return (
    <div style={{ width: '70%', margin: 'auto', marginBottom: '50px' }}>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 2fr 1fr 2fr',
          widht: '100%'
        }}
      >
        <h3 style={{ margin: 'auto' }}>Description</h3>
        <h3 style={{ margin: 'auto' }}>Picture</h3>
        <h3 style={{ margin: 'auto' }}>Price</h3>
        <h3 style={{ margin: 'auto' }}>Actions</h3>
      </div>

      {/* Body */}
      {data &&
        data.user &&
        data.user.products.length > 0 &&
        data.user.products.map(product => (
          <UserProductItem key={product.id} product={product} />
        ))}
    </div>
  )
}

export default UserProducts
