import {Rest, Get, Inject, Post} from '../configuration/noants/decorators';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthenticationService } from '../authentication/authentication.service';

@Rest
export class UserRest {

  @Inject userService: UserService;
  @Inject authenticationService: AuthenticationService

  @Post(['/api/signIn'])
  signIn(signInForm: any): any {
    return this.authenticationService.doSignIn(signInForm.login, signInForm.password);
  }

  @Get(['/api/signOut/:login', true])
  signOut(username: string): any {
    return this.authenticationService.doSignOut(username);
  }

  @Get(['/api/signedUser/:login', true])
  signedUser(login: string): UserEntity {
    return this.userService.getUserByLogin(login);
  }
}
