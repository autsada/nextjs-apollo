import React from "react"
import Link from "next/link"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const QUERY_PRODUCTS = gql`
  query {
    products {
      id
      description
      price
      imageUrl
    }
  }
`

const products = () => {
  const { data, loading, error } = useQuery(QUERY_PRODUCTS)

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "40px"
      }}
    >
      {data.products.map(prod => (
        <div
          key={prod.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Link href="/products/[productId]" as={`/products/${prod.id}`}>
            <a>
              <img src={prod.imageUrl} alt={prod.description} width="250px" />
            </a>
          </Link>
          <h3>{prod.description}</h3>
          <h4>{prod.price} THB</h4>
          <button
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              cursor: "pointer",
              border: "none"
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default products
