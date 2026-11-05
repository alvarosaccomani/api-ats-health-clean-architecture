import { RolPermissionEntity, RolPermissionCreateInput } from "./rol-permission.entity";

export interface RolPermissionRepository {
    getRolPermissions(options?: { transaction?: any }): Promise<RolPermissionEntity[] | null>;
    findRolPermissionById(rol_uuid: string, per_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity | null>;
    createRolPermission(data: RolPermissionCreateInput, options?: { transaction?: any }): Promise<RolPermissionEntity | null>;
    deleteRolPermission(rol_uuid: string, per_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity | null>;
    getRolPermissionsByRol(rol_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity[] | null>;
    getRolPermissionsByPermission(per_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity[] | null>;
    syncPermissionsToRol(rol_uuid: string, per_uuids: string[], options?: { transaction?: any }): Promise<RolPermissionEntity[] | null>;
}
