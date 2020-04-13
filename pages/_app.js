// import App from 'next/app'

import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import cookie from 'cookie'

import PageLayout from '../components/PageLayout'
import AuthProvider from '../appState/AuthProvider'
import apolloClient from '../apollo/apolloClient'

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <ApolloProvider client={apollo}>
//       <PageLayout>
//         <Component {...pageProps} />
//       </PageLayout>
//     </ApolloProvider>
//   )
// }

const QUERY_USER = {
  query: `
    query {
      user {
        id
        name
        email
        products {
          id
          imageUrl
          description
          price
        }
        carts {
          id
          product {
            description
            imageUrl
            price
          }
          quantity
        }
        orders {
          id
          items {
            product {
              description
              price
              imageUrl
            }
            quantity
          }
        }
        cards {
          id
          cardInfo {
            id
            expiration_month
            expiration_year
            brand
            last_digits
          }
        }
      }
    }
  `,
}

function MyApp({ Component, pageProps, apollo, user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AuthProvider>
    </ApolloProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }

  const { headers } = ctx.req

  const cookies = headers && cookie.parse(headers.cookie || '')

  const token = cookies && cookies.jwt

  if (!token) {
    if (router.pathname === '/cart' || router.pathname === '/manageProduct') {
      ctx.res.writeHead(302, { Location: '/signin' })
      ctx.res.end()
    }
    return null
  }

  const response = await fetch('http://localhost:4444/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}` || '',
    },
    body: JSON.stringify(QUERY_USER),
  })

  if (response.ok) {
    const result = await response.json()
    return { user: result.data.user }
  } else {
    if (router.pathname === '/cart') {
      ctx.res.writeHead(302, { Location: '/signin' })
      ctx.res.end()
    }
    return null
  }
  // calls page's `getInitialProps` and fills `appProps.pageProps`
}

export default apolloClient(MyApp)
