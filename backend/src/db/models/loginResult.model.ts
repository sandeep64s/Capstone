export class LoginResult {
    userValidated!: boolean;
    passwordValidated!: boolean;
    userDeleted!: boolean;

    constructor(userValidated: boolean, passwordValidated: boolean, userDeleted: boolean) {
        this.userValidated = userValidated;
        this.passwordValidated = passwordValidated;
        this.userDeleted = userDeleted;
    }
}