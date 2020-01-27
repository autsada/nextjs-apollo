import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "isomorphic-unfetch"
import withApollo from "next-with-apollo"

const uri = "http://localhost:4444/graphql"

const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token = JSON.parse(localStorage.getItem("jwt"))

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  })
})
