export interface IRegForm {
    firstName: string
    email: string
    password: string
    passwordConfirmation: string
}

export interface RegistrationFormProps {
    onClose: () => void,
    onOpenAuthForm: () => void
}
