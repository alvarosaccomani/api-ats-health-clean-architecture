import { RolPermissionCreateInput } from "../../domain/rol-permission/rol-permission.entity";
import { RolPermissionRepository } from "../../domain/rol-permission/rol-permission.repository";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class RolPermissionUseCase {
    constructor(
        private readonly rolPermissionRepository: RolPermissionRepository
    ) {
        this.getRolPermissions = this.getRolPermissions.bind(this);
        this.findRolPermissionById = this.findRolPermissionById.bind(this);
        this.assignPermissionToRol = this.assignPermissionToRol.bind(this);
        this.removePermissionFromRol = this.removePermissionFromRol.bind(this);
        this.getPermissionsByRol = this.getPermissionsByRol.bind(this);
        this.getRolesByPermission = this.getRolesByPermission.bind(this);
        this.syncPermissionsToRol = this.syncPermissionsToRol.bind(this);
    }

    public async getRolPermissions(options?: { transaction?: any }) {
        try {
            const list = await this.rolPermissionRepository.getRolPermissions(options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                rolper_createdat: item.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: item.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getRolPermissions (use case):', error.message);
            throw error;
        }
    }

    public async findRolPermissionById(rol_uuid: string, per_uuid: string, options?: { transaction?: any }) {
        try {
            if (!rol_uuid || !per_uuid) {
                throw new Error("Se requiere rol_uuid y per_uuid.");
            }
            const item = await this.rolPermissionRepository.findRolPermissionById(rol_uuid, per_uuid, options);
            if (!item) {
                throw new Error(`Asignación de rol ${rol_uuid} y permiso ${per_uuid} no encontrada.`);
            }
            return {
                ...item,
                rolper_createdat: item.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: item.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findRolPermissionById (use case):', error.message);
            throw error;
        }
    }

    public async assignPermissionToRol(input: RolPermissionCreateInput, options?: { transaction?: any }) {
        try {
            if (!input.rol_uuid) {
                throw new Error("Se requiere rol_uuid para asignar el permiso.");
            }
            if (!input.per_uuid) {
                throw new Error("Se requiere per_uuid para asignar el permiso.");
            }

            const existing = await this.rolPermissionRepository.findRolPermissionById(input.rol_uuid, input.per_uuid, options);
            if (existing) {
                throw new Error(`El rol ${input.rol_uuid} ya tiene asignado el permiso ${input.per_uuid}.`);
            }

            const created = await this.rolPermissionRepository.createRolPermission(input, options);
            if (!created) {
                throw new Error("No se pudo asociar el permiso al rol.");
            }

            return {
                ...created,
                rolper_createdat: created.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(created.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: created.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(created.rolper_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en assignPermissionToRol (use case):', error.message);
            throw error;
        }
    }

    public async removePermissionFromRol(rol_uuid: string, per_uuid: string, options?: { transaction?: any }) {
        try {
            if (!rol_uuid || !per_uuid) {
                throw new Error("Se requiere rol_uuid y per_uuid para desvincular el permiso.");
            }

            const deleted = await this.rolPermissionRepository.deleteRolPermission(rol_uuid, per_uuid, options);
            if (!deleted) {
                throw new Error(`No se pudo desvincular el permiso ${per_uuid} del rol ${rol_uuid}.`);
            }

            return {
                ...deleted,
                rolper_createdat: deleted.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(deleted.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: deleted.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(deleted.rolper_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en removePermissionFromRol (use case):', error.message);
            throw error;
        }
    }

    public async getPermissionsByRol(rol_uuid: string, options?: { transaction?: any }) {
        try {
            if (!rol_uuid) {
                throw new Error("Se requiere rol_uuid.");
            }
            const list = await this.rolPermissionRepository.getRolPermissionsByRol(rol_uuid, options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                rolper_createdat: item.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: item.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getPermissionsByRol (use case):', error.message);
            throw error;
        }
    }

    public async getRolesByPermission(per_uuid: string, options?: { transaction?: any }) {
        try {
            if (!per_uuid) {
                throw new Error("Se requiere per_uuid.");
            }
            const list = await this.rolPermissionRepository.getRolPermissionsByPermission(per_uuid, options);
            if (!list) {
                return [];
            }
            return list.map(item => ({
                ...item,
                rolper_createdat: item.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: item.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getRolesByPermission (use case):', error.message);
            throw error;
        }
    }

    public async syncPermissionsToRol(rol_uuid: string, per_uuids: string[], options?: { transaction?: any }) {
        try {
            if (!rol_uuid) {
                throw new Error("Se requiere rol_uuid para sincronizar permisos.");
            }
            if (!Array.isArray(per_uuids)) {
                throw new Error("per_uuids debe ser un array de strings.");
            }

            const updatedList = await this.rolPermissionRepository.syncPermissionsToRol(rol_uuid, per_uuids, options);
            if (!updatedList) {
                return [];
            }
            return updatedList.map(item => ({
                ...item,
                rolper_createdat: item.rolper_createdat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_createdat, 'America/Buenos_Aires') : undefined,
                rolper_updatedat: item.rolper_updatedat ? TimezoneConverter.toIsoStringInTimezone(item.rolper_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en syncPermissionsToRol (use case):', error.message);
            throw error;
        }
    }
}
