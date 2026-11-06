import { UserEntity } from "../user/user.entity";

export interface AuthRepository {
    loginUser(usr_nick: string, usr_password: string, gettoken: boolean, options?: { transaction?: any }): Promise<UserEntity | string | null>;
    confirmAccount(usr_confirmationtoken: string, options?: { transaction?: any }): Promise<UserEntity | null>;
    forgotPassword(user: UserEntity, options?: { transaction?: any }): Promise<UserEntity | null>;
    findUserByResetToken(token: string, expirationDate: Date, options?: { transaction?: any }): Promise<UserEntity | null>;
    updatePassword(usr_uuid: string, newPassword: string, options?: { transaction?: any }): Promise<void>;
}
