import * as yup from 'yup'

export const emailSchema = yup
    .string()
    .email('Введіть коректну електронну адресу')
    .required('Електронна адреса є обовʼязковою');

export const passwordSchema = yup
    .string()
    .required('Пароль є обовʼязковим')
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .max(50, 'Пароль має бути не довшим за 50 символів');

export const authSchema = yup.object({
    email: emailSchema,
    password: passwordSchema,
});
