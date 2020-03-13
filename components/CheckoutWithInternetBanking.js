import React from 'react'
import Script from 'react-load-script'

let OmiseCard

const CheckoutWithInternetBanking = ({ carts }) => {
  const amount = carts.reduce(
    (sum, cart) => sum + cart.quantity * cart.product.price,
    0
  )

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard
    OmiseCard.configure({
      publicKey: process.env.OMISE_PUBLIC_KEY,
      currency: 'thb',
      frameLabel: 'Tea Shop',
      submitLabel: 'PAY NOW',
      buttonLabel: 'Pay with Omise'
    })
  }

  const internetBankingConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'internet_banking',
      otherPaymentMethods: [
        'bill_payment_tesco_lotus',
        'alipay',
        'pay_easy',
        'net_banking',
        'convenience_store'
      ]
    })
    OmiseCard.configureButton('#internet-banking')
    OmiseCard.attach()
  }

  const omiseCardHandler = () => {
    OmiseCard.open({
      frameDescription: 'Invoice #3847',
      amount: amount * 100,
      onCreateTokenSuccess: token => {
        console.log(token)
        //   createCreditCardCharge(user.email, user.name, cart.amount, token)
      },
      onFormClosed: () => {}
    })
  }

  const handleClick = () => {
    internetBankingConfigure()
    omiseCardHandler()
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
      }}
    >
      <Script url='https://cdn.omise.co/omise.js' onLoad={handleLoadScript} />
      <form>
        <button
          style={{
            padding: '5px 10px',
            cursor: 'pointer',
            background: 'blue',
            border: 'none',
            fontSize: '18px',
            color: 'white'
          }}
          id='internet-banking'
          type='button'
          disabled={!amount}
          onClick={handleClick}
        >
          Pay with Internet Banking
        </button>
      </form>
    </div>
  )
}

export default CheckoutWithInternetBanking
