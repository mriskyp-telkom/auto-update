export type FormLoginType = 'email' | 'password'

export type FormRegisterType = 'npsn' | 'activation_code'

export type FormResetAccountType = FormLoginType | 'password_confirmation'

export interface FormLoginData {
  email: string
  password: string
}

export interface FormRegisterData {
  npsn: string
  activation_code: string
}

export interface FormResetAccountData extends FormLoginData {
  password_confirmation: string
}
