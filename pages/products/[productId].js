import React from "react"
import { useRouter } from "next/router"

const product = () => {
  const route = useRouter()

  return <div>Dynamic page: {route.query.productId}</div>
}

export default product
