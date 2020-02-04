import React from "react"

import apolloClient from "../apollo/apolloClient"
import Signin from "../components/Signin"

const SignInPage = () => {
  return <Signin />
}

export default apolloClient(SignInPage)
