import React from "react"
import Head from "next/head"

import Nav from "./Nav"

const PageLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>My Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      {children}
    </div>
  )
}

export default PageLayout
