import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import { AuthContext } from '../appState/AuthProvider'
import { ME } from './UserProducts'

const liStyle = { listStyle: 'none' }

const aStyle = {
  color: 'white',
  fontSize: '23px',
  fontWeight: 'bold',
  textDecoration: 'none'
}

const Nav = () => {
  const { user, signout, setAuthUser } = useContext(AuthContext)
  const { data } = useQuery(ME)

  useEffect(() => {
    if (data) {
      setAuthUser(data.user)
    }
  }, [data])

  console.log(user)
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
                <a style={aStyle}>
                  Cart{' '}
                  <span
                    style={{
                      background: 'red',
                      color: 'white',
                      padding: '3px',
                      borderRadius: '50%'
                    }}
                  >
                    {user && user.carts && user.carts.length === 0 && 0}
                    {user &&
                      user.carts &&
                      user.carts.length > 0 &&
                      user.carts.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </a>
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
