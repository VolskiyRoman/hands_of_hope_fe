import React from 'react'
import Layout from 'containers/Layout'
import { useGetCurrentUserQuery, useUpdateUserMutation } from 'api/extendedApi'
import { useForm } from 'react-hook-form'
import { Button, Label, Input } from '@roketid/windmill-react-ui'

type UpdateFormValues = {
  first_name: string
  last_name: string
}

const UserProfilePage = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery({})
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormValues>({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    },
    values: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    }
  })

  const onSubmit = async (data: UpdateFormValues) => {
    try {
      await updateUser(data).unwrap()
      alert('Інформацію оновлено успішно.')
    } catch (err) {
      console.error('❌ Помилка оновлення:', err)
      alert('Помилка оновлення користувача.')
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Профіль користувача</h1>

        {isLoading ? (
          <p className="text-gray-600 dark:text-gray-300">Завантаження...</p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Label>
              Імʼя
              <Input
                {...register('first_name', { required: 'Це поле обовʼязкове' })}
                className={errors.first_name ? 'border-red-500' : ''}
              />
              {errors.first_name && (
                <p className="text-xs text-red-600 mt-1">{errors.first_name.message}</p>
              )}
            </Label>

            <Label>
              Прізвище
              <Input
                {...register('last_name', { required: 'Це поле обовʼязкове' })}
                className={errors.last_name ? 'border-red-500' : ''}
              />
              {errors.last_name && (
                <p className="text-xs text-red-600 mt-1">{errors.last_name.message}</p>
              )}
            </Label>

            <Button type="submit" block disabled={isUpdating}>
              {isUpdating ? 'Оновлення...' : 'Зберегти зміни'}
            </Button>
          </form>
        )}
      </div>
    </Layout>
  )
}

export default UserProfilePage
