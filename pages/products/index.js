import React from "react"
import Link from "next/link"

const fakeData = [
  {
    id: 1,
    description: "Rooibos Tea",
    price: 100,
    imageUrl: "https://s3.images-iherb.com/ygt/ygt41533/v/11.jpg"
  },
  {
    id: 2,
    description: "Green Tea",
    price: 150,
    imageUrl: "https://s3.images-iherb.com/hnb/hnb01381/v/0.jpg"
  },
  {
    id: 3,
    description: "Black Tea",
    price: 200,
    imageUrl: "https://s3.images-iherb.com/hrn/hrn00959/v/4.jpg"
  }
]

const products = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "40px"
      }}
    >
      {fakeData.map(prod => (
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
