import React, { useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

// const REQUEST_RESET_PASSWORD = gql`
//   mutation REQUEST_RESET_PASSWORD($email: String!) {
//     requestResetPassword(email: $email) {
//       message
//     }
//   }
// `

const ResetPassword = () => {
  const [password, setPassword] = useState("")

  const router = useRouter()
  //   const [message, setMessage] = useState("")

  //   const [requestResetPassword, { loading, error }] = useMutation(
  //     REQUEST_RESET_PASSWORD,
  //     {
  //       variables: { email },
  //       onCompleted: data => {
  //         if (data) {
  //           setMessage(data.requestResetPassword.message)
  //         }
  //       }
  //     }
  //   )

  const handleChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      // await requestResetPassword()
    } catch (error) {
      console.log(error)
    }
  }

  console.log(password)
  console.log(router && router.query.resetToken)
  return (
    <div style={{ margin: "100px" }}>
      <div style={{ width: "30%", margin: "auto" }}>
        Please enter your new password below.
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "30%"
        }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ margin: "5px", height: "30px" }}
          type="password"
          name="password"
          placeholder="Your new password"
          value={password}
          onChange={handleChange}
        />
        <button
          style={{
            margin: "5px",
            padding: "10px",
            background: "teal",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px"
          }}
          type="submit"
          //  disabled={loading}
        >
          Submit
        </button>
      </form>

      <div style={{ width: "30%", margin: "auto" }}>
        {/* {message && <p style={{ color: "blue" }}>{message}</p>} */}
      </div>

      <div style={{ width: "30%", margin: "auto" }}>
        {/* {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )} */}
      </div>
    </div>
  )
}

export default ResetPassword
