import React from 'react'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Clerk } from '@clerk/clerk-js'

type Props = {}

const SignIn = (props: Props) => {
    

  return (
    <SignInButton />
  )
}

const SignUp = (props: Props) => {
  return (
    < SignUpButton />
  )
}

const Logout = (props: Props) => {
  return (
    <div>Auth</div>
  )
}

export default {
    SignIn,
    SignUp,
    Logout
}
