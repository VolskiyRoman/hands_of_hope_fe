import Link from 'next/link'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {Button} from '@roketid/windmill-react-ui'

import {useRegisterMutation} from '../api/extendedApi'
import {FormProvider} from '../components/HookForm'
import RHFTextField from '../components/HookForm/RHFTextField'
import {AuthRequest} from '../api/types/auth'
import {localStorageService} from '../utils/localStorage'
import StaticSideImage from "../components/StaticSideImage"

type RegisterFormValues = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export default function CreateAccount() {
  const methods = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    }
  })
  const router = useRouter()
  const { handleSubmit } = methods
  const [register, { isLoading }] = useRegisterMutation()

  const onSubmit = async (data: RegisterFormValues) => {
    const { email, password, firstName, lastName, confirmPassword } = data

    if (password !== confirmPassword) {
      methods.setError('confirmPassword', {
        type: 'manual',
        message: 'Паролі не співпадають'
      })
      return
    }

    try {
      const response = await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName
      } as AuthRequest).unwrap()

      localStorageService.setAccessToken(response.access)
      localStorageService.setRefreshToken(response.refresh)
      router.replace('/')
    } catch (err: any) {
      if (err?.status === 400 && typeof err.data === 'object') {
        Object.entries(err.data).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            methods.setError(field as keyof RegisterFormValues, {
              type: 'server',
              message: messages[0]
            })
          }
        })
      } else {
        console.error('Помилка реєстрації:', err)
      }
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-5xl mx-auto bg-white rounded-xl shadow-xl dark:bg-gray-800 min-h-[400px]">
        <div className="flex flex-col overflow-y-auto md:flex-row h-full">
          <StaticSideImage
            src="/assets/img/logo.png"
            alt="Фонове зображення"
            className="hidden md:block w-[400px] min-h-[650px]"
          />
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Створити обліковий запис
              </h1>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField name="email" label="Електронна пошта" type="email" />
                <RHFTextField name="firstName" label="Імʼя" type="text" className="mt-4" />
                <RHFTextField name="lastName" label="Прізвище" type="text" className="mt-4" />
                <RHFTextField name="password" label="Пароль" type="password" className="mt-4" />
                <RHFTextField name="confirmPassword" label="Підтвердження паролю" type="password" className="mt-4" />

                <Button block className="mt-4" type="submit" disabled={isLoading}>
                  Зареєструватися
                </Button>
              </FormProvider>

              <hr className="my-8" />
              <p className="mt-4">
                <Link href="/login">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Вже маєте акаунт? Увійти
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
