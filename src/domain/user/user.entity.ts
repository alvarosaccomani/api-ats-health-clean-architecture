export interface UserEntity {
    usr_uuid: string;
    usr_name: string;
    usr_surname: string;
    usr_password: string;
    usr_image?: string | null;
    usr_email: string;
    usr_nick: string;
    usr_bio?: string | null;
    usr_socket?: string | null;
    usr_online: boolean;
    usr_createdat: Date;
    usr_updatedat: Date;
}

export type UserUpdateData = Partial<Pick<UserEntity, 'usr_name' | 'usr_surname' | 'usr_password' | 'usr_image' | 'usr_email' | 'usr_nick' | 'usr_bio' | 'usr_socket' | 'usr_online'>>;
