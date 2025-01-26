import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function SigninMobile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError(res.error)
        return
      }

      router.replace('/Sections/DashBoard/main')
    } catch (error: unknown) {  // Use a more specific type for the error
      if (error instanceof Error) {
        setError(error.message)  // Safely access the error message
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <div>
      <form className='flex flex-col gap-7 w-[90%] mx-auto my-7' onSubmit={handleSubmit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          className='bg-gray-100 border-gray-300 font-medium border-b-2 w-[100%] pr-4 flex mx-auto'
          placeholder='Enter Your Email'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          className='bg-gray-100 border-gray-300 font-medium border-b-2 w-[100%] pr-4 flex mx-auto'
          placeholder='Enter Your Password'
        />
        <button
          type='submit'
          className='w-fit px-4 py-1.5 text-gray-100 shadow-xl hover:bg-SC_Red3 duration-200 font-bold bg-SC_Red2 rounded-xl'
        >
          Submit
        </button>
      </form>
      {error && <p className="font-medium text-red-500">{error}</p>}
    </div>
  )
}

export default SigninMobile
