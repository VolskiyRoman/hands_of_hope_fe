import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {Button} from '@roketid/windmill-react-ui'

import RHFTextField from 'components/HookForm/RHFTextField'
import {useLoginMutation} from '../api/extendedApi'
import {FormProvider} from '../components/HookForm'
import {AuthRequest} from '../api/types/auth'
import {localStorageService} from '../utils/localStorage'
import StaticSideImage from '../components/StaticSideImage'

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()
  const {handleSubmit} = methods
  const [login, {isLoading}] = useLoginMutation()
  const [formError, setFormError] = React.useState('')

  const onSubmit = async (data: AuthRequest) => {
    setFormError('')
    try {
      const response = await login(data).unwrap()
      localStorageService.setAccessToken(response.access)
      localStorageService.setRefreshToken(response.refresh)
      router.replace('/')
    } catch (error: any) {
      if (error?.status === 401 && error?.data?.detail) {
        setFormError('Помилка входу')
      } else {
        setFormError('Сталася помилка. Спробуйте ще раз.')
      }
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-5xl mx-auto bg-white rounded-xl shadow-xl dark:bg-gray-800 min-h-[400px]">
        <div className="flex flex-col overflow-y-auto md:flex-row h-full">
          <StaticSideImage
            src="/assets/img/logo.png"
            alt="Login background"
            className="hidden md:block w-[400px] min-h-[650px]"
          />
          <main className="flex items-center justify-center p-8 sm:p-12 md:w-1/2">
            <div className="w-full max-w-md">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Увійти
              </h1>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField
                  name="email"
                  label="Електронна пошта"
                  placeholder="name@example.com"
                  type="email"
                />

                <RHFTextField
                  name="password"
                  label="Пароль"
                  placeholder="***************"
                  type="password"
                  className="mt-4"
                />

                <Button className="mt-4" block type="submit" disabled={isLoading}>
                  Увійти
                </Button>

                {formError && (
                  <div className="mt-3 text-sm font-medium text-red-600 dark:text-red-400 text-center">
                    {formError}
                  </div>
                )}
              </FormProvider>

              <hr className="my-8" />
              <p className="text-center">
                <Link href="/create-account">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Створити обліковий запис
                  </a>
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
