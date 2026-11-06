import { RolEntity, RolUpdateData } from "./rol.entity";

export interface RolRepository {
    getRoles(options?: { transaction?: any }): Promise<RolEntity[] | null>;
    findRolById(rol_uuid: string, options?: { transaction?: any }): Promise<RolEntity | null>;
    createRol(rol: RolEntity, options?: { transaction?: any }): Promise<RolEntity | null>;
    updateRol(rol_uuid: string, rol: RolUpdateData, options?: { transaction?: any }): Promise<RolEntity | null>;
    deleteRol(rol_uuid: string, options?: { transaction?: any }): Promise<RolEntity | null>;
    findRolByName(rol_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<RolEntity | null>;
}
