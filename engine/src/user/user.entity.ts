export class UserEntity  {
    constructor(
        private id: number,
        private username: string,
        private email: string,
        private firstName: string,
        private lastName: string,
        private roles: Array<string>,
        private password: string
    ) {};

    getId(): number {
        return this.id;
    }
    getUserName(): string {
        return this.username;
    }
    getRole(): Array<string> {
        return this.roles;
    }
    getEmail(): string {
        return this.email; 
    }
    getPassword(): string {
        return this.password;
    }
}