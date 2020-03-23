import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import CartItem from './CartItem'
import { AuthContext } from '../appState/AuthProvider'
import CheckoutWithCreditCard from './CheckoutWithCreditCard'
import CheckoutWithInternetBanking from './CheckoutWithInternetBanking'
import { ME } from './Nav'

const CREATE_ORDER = gql`
  mutation CREATE_ORDER(
    $amount: Float!
    $cardId: String
    $token: String
    $return_uri: String
  ) {
    createOrder(
      amount: $amount
      cardId: $cardId
      token: $token
      return_uri: $return_uri
    ) {
      id
      items {
        id
        product {
          description
          price
        }
        quantity
      }
      authorize_uri
    }
  }
`

const calculateAmount = carts => {
  const amount = carts.reduce(
    (sum, cart) => sum + cart.quantity * cart.product.price,
    0
  )
  return amount * 100
}

const Carts = () => {
  const { user } = useContext(AuthContext)

  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER, {
    onCompleted: data => {
      if (data.createOrder.authorize_uri) {
        window.location.href = data.createOrder.authorize_uri
      }
    },
    refetchQueries: [{ query: ME }]
  })

  const handleCheckout = async (amount, cardId, token, return_uri) => {
    const result = await createOrder({
      variables: { amount, cardId, token, return_uri }
    })
    console.log('Result -->', result)
  }

  console.log(user)
  return (
    user && (
      <div style={{ width: '70%', margin: 'auto', marginTop: '50px' }}>
        {user.carts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr',
                widht: '100%'
              }}
            >
              <h3 style={{ margin: 'auto' }}>Description</h3>
              <h3 style={{ margin: 'auto' }}>Picture</h3>
              <h3 style={{ margin: 'auto' }}>Price</h3>
              <h3 style={{ margin: 'auto' }}>Quantity</h3>
              <h3 style={{ margin: 'auto' }}>Amount</h3>
              <h3 style={{ margin: 'auto' }}>Actions</h3>
            </div>

            <>
              {/* Body */}
              {user.carts.length > 0 &&
                user.carts.map(cart => <CartItem key={cart.id} cart={cart} />)}
            </>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 2fr',
                width: '100%'
              }}
            >
              <div style={{ margin: 'auto' }}></div>
              <div style={{ margin: 'auto' }}></div>
              <div style={{ margin: 'auto' }}></div>
              <div style={{ margin: 'auto' }}></div>
              <div style={{ margin: 'auto' }}>
                {user.carts.length > 0 && calculateAmount(user.carts) / 100}
              </div>
              <div style={{ margin: 'auto' }}></div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
              }}
            >
              <div>
                {user &&
                  user.cards &&
                  user.cards.map(card => (
                    <div
                      key={card.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <p>
                        **** **** {card.cardInfo.last_digits}{' '}
                        {card.cardInfo.brand} expire:
                        {card.cardInfo.expiration_month}/
                        {card.cardInfo.expiration_year}
                      </p>
                      <button
                        style={{
                          background: 'blue',
                          cursor: 'pointer',
                          color: 'white',
                          border: 'none'
                        }}
                        onClick={() => {
                          const amount = calculateAmount(user.carts)
                          handleCheckout(amount, card.id)
                        }}
                      >
                        Use This Card
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <CheckoutWithCreditCard
              amount={calculateAmount(user.carts)}
              handleCheckout={handleCheckout}
            />
            <CheckoutWithInternetBanking
              amount={calculateAmount(user.carts)}
              handleCheckout={handleCheckout}
            />
          </>
        )}
      </div>
    )
  )
}

export default Carts
