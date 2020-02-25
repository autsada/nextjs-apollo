import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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
    }
  }
`

const UserProducts = () => {
  const { data, loading, error } = useQuery(ME)

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 2fr',
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
          <div
            key={product.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 2fr',
              width: '100%',
              borderTop: '1px solid grey',
              borderBottom: '1px solid grey'
            }}
          >
            <div style={{ margin: 'auto' }}>
              <p>{product.description}</p>
            </div>
            <div style={{ margin: 'auto' }}>
              <img
                src={product.imageUrl}
                alt={product.description}
                width='50px'
              />
            </div>
            <div style={{ margin: 'auto' }}>
              <p>{product.price}</p>
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
                  background: 'orange'
                }}
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
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserProducts
