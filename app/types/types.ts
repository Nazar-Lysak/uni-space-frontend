import { User } from "./interfaces";

export type SignInFieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

  
export type UserSignUp = Partial<Pick<User, 'email' | 'market' | 'name'>> & {
    password?: string;
};

export type UserSignIn = {
    email: string,
    password: string
}