import React, { useContext } from 'react'
import Link from 'next/link'

import { AuthContext } from '../appState/AuthProvider'

const liStyle = { listStyle: 'none' }

const aStyle = {
  color: 'white',
  fontSize: '23px',
  fontWeight: 'bold',
  textDecoration: 'none'
}

const Nav = () => {
  const { user, signout } = useContext(AuthContext)

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80px',
        background: 'blue'
      }}
    >
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '70%'
        }}
      >
        <li style={liStyle}>
          <Link href='/'>
            <a style={aStyle}>Home</a>
          </Link>
        </li>
        <li style={liStyle}>
          <Link href='/products'>
            <a style={aStyle}>Products</a>
          </Link>
        </li>
        {user && (
          <>
            <li style={liStyle}>
              <Link href='/cart'>
                <a style={aStyle}>Cart</a>
              </Link>
            </li>

            <li style={liStyle}>
              <Link href='/manageProduct'>
                <a style={aStyle}>Manage Product</a>
              </Link>
            </li>

            <button
              style={{
                background: 'grey',
                fontSize: '18px',
                padding: '10px',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={signout}
            >
              Sign Out
            </button>
          </>
        )}

        {!user && (
          <>
            <li style={liStyle}>
              <Link href='/signin'>
                <a style={aStyle}>Sign In</a>
              </Link>
            </li>
            <li style={liStyle}>
              <Link href='/signup'>
                <a style={aStyle}>Sign Up</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
