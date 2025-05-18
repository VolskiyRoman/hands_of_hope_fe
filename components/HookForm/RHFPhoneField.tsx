import React from 'react'
import { useFormContext, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Label, Input } from '@roketid/windmill-react-ui'

type RHFPhoneFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  placeholder?: string
  validation?: RegisterOptions<T, Path<T>>
}

const RHFPhoneField = <T extends FieldValues>({
                                                name,
                                                label,
                                                placeholder,
                                                validation,
                                              }: RHFPhoneFieldProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  const error = errors[name]
  const errorMessage = error?.message as string | undefined

  const defaultPhoneValidation: RegisterOptions<T, Path<T>> = {
    required: 'Це поле обовʼязкове',
    pattern: {
      value: /^\+?[1-9]\d{7,14}$/,
      message: 'Невірний формат. Має бути +1234567890',
    },
  }

  return (
    <Label className="w-full">
      <span>{label}</span>
      <Input
        type="tel"
        placeholder={placeholder || '+1234567890'}
        className={`mt-1 w-full ${errorMessage ? 'border-red-500' : ''}`}
        {...register(name, validation ?? defaultPhoneValidation)}
      />
      {errorMessage && <p className="mt-1 text-xs text-red-600">{errorMessage}</p>}
    </Label>
  )
}

export default RHFPhoneField
