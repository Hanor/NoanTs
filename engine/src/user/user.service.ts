import {Service, Inject} from '../configuration/noants/decorators';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Service
export class UserService {

    @Inject userRepository: UserRepository;
    
    getUserById(id: number): UserEntity {
        return this.userRepository.getUserById(id);
    }
    getUserByLoginAndPassword(login: string, password: string): UserEntity {
        return this.userRepository.getUserByLoginAndPassword(login, password);
    }
    getUserByLogin(login: string): UserEntity {
        return this.userRepository.getUserByLogin(login);
    }
}
