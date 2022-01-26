export interface FormLoginData {
  email: string
  password: string
}

export interface FormRegisterData {
  nspn: string
  activation_code: string
}

export interface FormResetAccountData extends FormLoginData {
  password_confirmation: string
}
