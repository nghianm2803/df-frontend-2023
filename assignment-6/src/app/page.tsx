'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginSchema, LoginSchemaType } from '../schemas/login'
import useAuth from '../hooks/useAuth'
// import apiService from './apiService'

const LoginPage = () => {
  const Router = useRouter()
  const auth = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'doo@gmail.com',
      password: 'Doocharsiu1@',
    },
  })

  // const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
  //   // Router.push('/books')
  //   const { email, password } = data
  //   try {
  //     await auth.login({ email, password }, () => {
  //       console.log('Login success')
  //       console.log('Email:', email)
  //       console.log('Password:', password)
  //       Router.push('/books')
  //     })
  //   } catch (error) {
  //     reset()
  //   }
  // }

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    const { email, password } = data

    try {
      const response = await auth.login({ email, password })
      console.log('Login response:', response)

      await new Promise(() => {
        if (auth.isAuthenticated) {
          console.log('Auth:', auth)
          console.log('Email:', email)
          console.log('Password:', password)
          Router.push('/books')
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      reset()
    }
  }

  return (
    <div className="w-full h-full block fixed px-1 pt-16 left-0 right-0 overflow-auto z-10 bg-transparent dark:bg-slate-800">
      <div className="m-auto bg-white dark:bg-slate-800 p-5 border rounded-md w-96 shadow-2xl popoutModal animation-popoutModal">
        <h1 className="text-4xl text-[#d2445a] dark:text-white font-bold p-5 text-center">
          Bookstore
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col align-middle justify-center m-3">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Email (*)
                <input
                  {...register('email')}
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  placeholder="Enter your email"
                  id="email"
                  autoFocus
                />
                {errors.email && (
                  <p className="text-sm font-bold text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </label>
            </div>
            <div className="mb-1">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Password (*)
                <input
                  {...register('password')}
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  autoComplete="on"
                />
                {errors.password && (
                  <p className="text-sm font-bold text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </label>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
