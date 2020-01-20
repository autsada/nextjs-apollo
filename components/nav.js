import React from "react"
import Link from "next/link"

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </li>
      <li>
        <Link href="/cart">
          <a>Cart</a>
        </Link>
      </li>
      <li>
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
