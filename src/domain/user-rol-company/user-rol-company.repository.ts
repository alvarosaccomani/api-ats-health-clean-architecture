import { UserRolCompanyEntity } from "./user-rol-company.entity";

export interface UserRolCompanyRepository {
    getUserRolesCompany(cmp_uuid: string, options?: { transaction?: any }): Promise<UserRolCompanyEntity[] | null>;
    findUserRolCompanyById(cmp_uuid: string, usr_uuid: string, rol_uuid: string, options?: { transaction?: any }): Promise<UserRolCompanyEntity | null>;
    createUserRolCompany(userRolCompany: UserRolCompanyEntity, options?: { transaction?: any }): Promise<UserRolCompanyEntity | null>;
    updateUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string, userRolCompany: Partial<UserRolCompanyEntity>, options?: { transaction?: any }): Promise<UserRolCompanyEntity | null>;
    deleteUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string, options?: { transaction?: any }): Promise<UserRolCompanyEntity | null>;
    existUserRolCompany(cmp_uuid: string, usr_uuid: string, rol_uuid: string, options?: { transaction?: any }): Promise<UserRolCompanyEntity | null>;
    getUserRolesCompanyByUser(usr_uuid: string, options?: { transaction?: any }): Promise<UserRolCompanyEntity[] | null>;
    getUserRolesCompanyByCompanyUser(cmp_uuid: string, usr_uuid: string, options?: { transaction?: any }): Promise<UserRolCompanyEntity[] | null>;
}
