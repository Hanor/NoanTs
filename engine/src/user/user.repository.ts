import {Repository} from '../configuration/noants/decorators';
import { UserEntity } from './user.entity';

//this is an example;
const mockUser: UserEntity = new UserEntity(19, 'vader', 'vader@dinasty.star', 'Anakin', 'Skywalker', ['admin'], 'asdba3Wqw123LoasdpqweIU123IKascvdDd');

@Repository
export class UserRepository {
    constructor() {};
    getUserById(id: number): UserEntity {
        const userMock = mockUser; // this should execute a query in LDAP or Database
        return userMock;
    }
    getUserByLogin(login: string): UserEntity {
        const userMock = mockUser; // this should execute a query in LDAP or Database
        return userMock;
    }
    getUserByLoginAndPassword(login: string, password: string): UserEntity {
        //A test only, remove this in a real scenario
        if (login != mockUser.getUserName()) {
            return null;
        }
        const userMock = mockUser; // this should execute a query in LDAP or Database
        return userMock;
    }
}
