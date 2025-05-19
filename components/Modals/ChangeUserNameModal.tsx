import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Label,
  Input,
} from '@roketid/windmill-react-ui'
import { useForm } from 'react-hook-form'
import { FormProvider } from 'components/HookForm'
import { useUpdateUserMutation, useGetCurrentUserQuery } from 'api/extendedApi'

type FormValues = {
  first_name: string
  last_name: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ChangeUserNameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { data: user } = useGetCurrentUserQuery({})
  const [updateUser] = useUpdateUserMutation()

  const methods = useForm<FormValues>({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (data: FormValues) => {
    try {
      await updateUser(data).unwrap()
      onClose()
    } catch (err) {
      console.error('❌ Помилка при оновленні імені:', err)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-lg font-semibold">Змінити імʼя користувача</ModalHeader>
      <ModalBody>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Label>
              Імʼя
              <Input
                {...register('first_name', {
                  required: 'Імʼя обовʼязкове',
                })}
                className={errors.first_name ? 'border-red-500' : ''}
              />
              {errors.first_name && (
                <p className="text-xs text-red-600 mt-1">{errors.first_name.message}</p>
              )}
            </Label>

            <Label>
              Прізвище
              <Input
                {...register('last_name', {
                  required: 'Прізвище обовʼязкове',
                })}
                className={errors.last_name ? 'border-red-500' : ''}
              />
              {errors.last_name && (
                <p className="text-xs text-red-600 mt-1">{errors.last_name.message}</p>
              )}
            </Label>

            <Button type="submit" block>
              Зберегти зміни
            </Button>
          </div>
        </FormProvider>
      </ModalBody>
    </Modal>
  )
}

export default ChangeUserNameModal
