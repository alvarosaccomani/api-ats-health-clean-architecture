import { PermissionEntity, PermissionUpdateData } from "./permission.entity";

export interface PermissionRepository {
    getPermissions(options?: { transaction?: any }): Promise<PermissionEntity[] | null>;
    findPermissionById(per_uuid: string, options?: { transaction?: any }): Promise<PermissionEntity | null>;
    createPermission(permission: PermissionEntity, options?: { transaction?: any }): Promise<PermissionEntity | null>;
    updatePermission(per_uuid: string, permission: PermissionUpdateData, options?: { transaction?: any }): Promise<PermissionEntity | null>;
    deletePermission(per_uuid: string, options?: { transaction?: any }): Promise<PermissionEntity | null>;
    findPermissionBySlug(per_slug: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<PermissionEntity | null>;
}
