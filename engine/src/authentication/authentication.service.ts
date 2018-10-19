import { Service, Inject } from "../configuration/noants/decorators";
import * as JWT from 'jsonwebtoken';
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/user.entity";

// create you secret key;
const SECRET = 'Secret like life'

@Service
export class AuthenticationService {

    @Inject userService: UserService;

    doSignIn(login: string, password: string): any {
        const user: UserEntity = this.userService.getUserByLoginAndPassword(login, password);
        if (!user) {
            throw new Error('Username or Password is not correct.');
        }
        const token: string = JWT.sign({data:JSON.stringify(user)}, SECRET,{ expiresIn: '3 days' });
        return {token: token};
    }
    doSignOut(username: string): any {
        return {signOut: true};
    }
    isTokenValid(token: string) {
        try {
            const decoded = JWT.verify(token, SECRET);
            const tokenUser = JSON.parse(decoded.data);
            const currentUser: UserEntity = this.userService.getUserById(tokenUser.id);
            if (tokenUser.username != currentUser.getUserName() || tokenUser.password != currentUser.getPassword()) {
                return false;
            } else {
                return true;
            }
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }
}