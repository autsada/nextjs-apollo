import React from "react"
import Link from "next/link"

const fakeData = [
  {
    id: 1,
    description: "Product A",
    price: 100
  },
  {
    id: 2,
    description: "Product B",
    price: 140
  },
  {
    id: 3,
    description: "Product C",
    price: 180
  }
]

const products = () => {
  return (
    <div>
      {fakeData.map(prod => (
        <Link
          key={prod.id}
          href="/products/[productId]"
          as={`/products/${prod.id}`}
        >
          <a>
            <div>{prod.description}</div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default products
