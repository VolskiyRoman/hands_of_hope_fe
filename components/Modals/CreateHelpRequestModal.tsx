import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  Textarea,
  Label
} from '@roketid/windmill-react-ui'
import { useForm } from 'react-hook-form'
import { FormProvider } from 'components/HookForm'
import RHFTextField from 'components/HookForm/RHFTextField'
import RHFPhoneField from 'components/HookForm/RHFPhoneField'
import { useCreateHelpRequestMutation } from 'api/extendedApi'

type FormValues = {
  type: string
  description: string
  location: string
  contact_phone: string
}

const helpTypes = [
  { value: 'shelter', label: 'Притулок' },
  { value: 'evacuation', label: 'Евакуація' },
  { value: 'medicine', label: 'Медикаменти' },
  { value: 'food', label: 'Їжа' },
  { value: 'psychological', label: 'Психологічна допомога' },
  { value: 'clothes', label: 'Одяг' },
  { value: 'transport', label: 'Транспорт' },
  { value: 'info_support', label: 'Інформаційна підтримка' },
  { value: 'repair', label: 'Ремонт' },
  { value: 'volunteer', label: 'Волонтерство' },
  { value: 'other', label: 'Інше' }
]

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CreateHelpRequestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      type: 'shelter',
      description: '',
      location: '',
      contact_phone: ''
    }
  })

  const [createHelpRequest] = useCreateHelpRequestMutation()

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await createHelpRequest(data).unwrap()
      onClose()
    } catch (err) {
      console.error('❌ Помилка створення:', err)
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader className={"pt-2 px-6 pb-1 -mt-4 -mx-6"}>Створити запит</ModalHeader>
      <ModalBody>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="space-y-4">
            <Label>
              Тип допомоги
              <Select {...methods.register('type')}>
                {helpTypes.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Select>
            </Label>

            <Label>
              Опис
              <Textarea
                rows={3}
                {...methods.register('description', { required: 'Опис обовʼязковий' })}
              />
              {methods.formState.errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {methods.formState.errors.description.message}
                </p>
              )}
            </Label>

            <RHFTextField<FormValues>
              name="location"
              label="Місцезнаходження"
              placeholder="Наприклад: Київ, вул. Хрещатик"
              validation={{ required: 'Поле обовʼязкове' }}
            />

            <RHFPhoneField<FormValues>
              name="contact_phone"
              label="Телефон для звʼязку"
            />

            <Button type="submit" block>
              Зберегти
            </Button>
          </div>
        </FormProvider>
      </ModalBody>
    </Modal>
  )
}

export default CreateHelpRequestModal
