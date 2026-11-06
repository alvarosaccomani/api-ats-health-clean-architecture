import { UserEntity, UserUpdateData } from "./user.entity";

export interface UserRepository {
    getUsers(options?: { transaction?: any }): Promise<UserEntity[] | null>;
    findUserById(usr_uuid: string, options?: { transaction?: any }): Promise<UserEntity | null>;
    findUserByEmail(usr_email: string, options?: { transaction?: any }): Promise<UserEntity | null>;
    registerUser(user: UserEntity, options?: { transaction?: any }): Promise<UserEntity | null>;
    updateUser(usr_uuid: string, user: UserUpdateData, options?: { transaction?: any }): Promise<UserEntity | null>;
    deleteUser(usr_uuid: string, options?: { transaction?: any }): Promise<UserEntity | null>;
    userExist(usr_nick: string, usr_email: string, options?: { transaction?: any }): Promise<UserEntity | null>;
    saveUser(user: UserEntity, options?: { transaction?: any }): Promise<UserEntity | null>;
    setSocketUser(usr_uuid: string, usr_socket: string, usr_online?: boolean, options?: { transaction?: any }): Promise<UserEntity | null>;
    findUserByNick(usr_nick: string, options?: { transaction?: any }): Promise<UserEntity | null>;
    findSocketUser(usr_uuid: string, options?: { transaction?: any }): Promise<string | null>;
}
