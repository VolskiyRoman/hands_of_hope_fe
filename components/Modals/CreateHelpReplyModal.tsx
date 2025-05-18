import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
  Label
} from '@roketid/windmill-react-ui'
import { useForm } from 'react-hook-form'
import { FormProvider } from 'components/HookForm'
import { useCreateHelpReplyMutation } from 'api/extendedApi'

type FormValues = {
  message: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  requestId: number
}

const CreateHelpReplyModal: React.FC<Props> = ({ isOpen, onClose, requestId }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      message: ''
    }
  })

  const [createReply] = useCreateHelpReplyMutation()

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await createReply({
        request: requestId,
        message: data.message
      }).unwrap()
      onClose()
    } catch (error) {
      console.error('❌ Помилка при надсиланні відповіді:', error)
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="pt-2 px-6 pb-1 -mt-4 -mx-6">
        Надіслати відповідь
      </ModalHeader>
      <ModalBody>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="space-y-4">
            <Label>
              Повідомлення
              <Textarea
                rows={4}
                {...methods.register('message', {
                  required: 'Поле обовʼязкове',
                  minLength: { value: 5, message: 'Мінімум 5 символів' }
                })}
              />
              {methods.formState.errors.message && (
                <p className="text-xs text-red-600 mt-1">
                  {methods.formState.errors.message.message}
                </p>
              )}
            </Label>

            <Button type="submit" block>
              Надіслати
            </Button>
          </div>
        </FormProvider>
      </ModalBody>
    </Modal>
  )
}

export default CreateHelpReplyModal
