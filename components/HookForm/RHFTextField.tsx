import { Input, Label } from '@roketid/windmill-react-ui'
import { useFormContext, FieldValues, Path } from 'react-hook-form'
import React from 'react'

type RHFTextFieldProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  type?: string
  className?: string
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const RHFTextField = <T extends FieldValues>({
                                               name,
                                               label,
                                               type = 'text',
                                               className,
                                               placeholder,
                                               ...rest
                                             }: RHFTextFieldProps<T>) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<T>()

  const fieldError = errors[name]
  const errorMessage = fieldError?.message as string | undefined

  return (
    <Label className="w-full">
      <span>{label}</span>
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`mt-1 w-full ${errorMessage ? 'border-red-500' : ''} ${className || ''}`}
        {...rest}
      />
      {errorMessage && <p className="mt-1 text-xs text-red-600">{errorMessage}</p>}
    </Label>
  )
}

export default RHFTextField
