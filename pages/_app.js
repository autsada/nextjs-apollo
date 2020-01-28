// import App from 'next/app'

// import { ApolloProvider } from "@apollo/react-hooks"

import PageLayout from "../components/PageLayout"
// import apolloClient from "../apollo/apolloClient"

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <ApolloProvider client={apollo}>
//       <PageLayout>
//         <Component {...pageProps} />
//       </PageLayout>
//     </ApolloProvider>
//   )
// }

function MyApp({ Component, pageProps, apollo }) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
