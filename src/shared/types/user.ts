export interface IRegUser {
    firstName: string;
    email: string;
    password: string;

    lastName: string;
    patronymic: string;
    
    birthDate: Date | string;
    phoneNumber: string;
}

export interface ILogUser {
    email: string;
    password: string;
}

export interface IUpdateUser {
    firstName?: string;
    email?: string;
    password?: string;

    lastName?: string;
    patronymic?: string;
    
    birthDate?: Date | string;
    phoneNumber?: string;
}