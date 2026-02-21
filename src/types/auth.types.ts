// Типы для пользователя
export interface IUser {
    id: number;
    email: string;
    name: string;
}

export interface IRegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName:string
}

export interface ILoginFormData {

    email : string;
    password:string;

}

export interface IAuthState {
    user : IUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string|null;
       
}

export interface IAuthResponse {
    id: number;
    email:string;
    name: string;
    password: string;
}