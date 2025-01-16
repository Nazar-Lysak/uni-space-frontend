import type { AuthOptions /*, User */ } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';


export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email:{label: 'email', type: 'email', required: true},
                password:{label: 'password', type: 'password', required: true},
            },
            async authorize(credentials) {
                console.log(credentials)
                // if(credentials?.email || credentials?.password) return null;
                // console.log('auth = ????')
                
                // const users:[] = [{"email": "test@test.com", "password": "111111"}];
                // const currentUser  = users.find(user => user.email === credentials?.email);

                // if(currentUser && currentUser.password === credentials?.password) {
                //     const {password, ...userWithoutPass} = currentUser;

                //     return userWithoutPass as User;
                // }

                return null;
            }
        })
    ]
}