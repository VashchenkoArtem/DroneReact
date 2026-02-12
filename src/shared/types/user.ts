export interface IRegUser {
    firstName: string;
    email: string;
    password: string;

    lastName: string;
    patronymic: string;
    
    birthDate: Date | string;
    phoneNumber: string;
}