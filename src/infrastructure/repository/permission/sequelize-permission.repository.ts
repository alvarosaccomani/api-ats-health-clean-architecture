import { Op } from "sequelize";
import { PermissionEntity, PermissionUpdateData } from "../../../domain/permission/permission.entity";
import { PermissionRepository } from "../../../domain/permission/permission.repository";
import { SequelizePermission } from "../../model/permission/permission.model";
import { SequelizeResourceType } from "../../model/resource-type/resource-type.model";
import { SequelizeResourceModule } from "../../model/resource-module/resource-module.model";

export class SequelizeRepository implements PermissionRepository {
    async getPermissions(options?: { transaction?: any }): Promise<PermissionEntity[] | null> {
        try {
            const permissions = await SequelizePermission.findAll({
                include: [
                    {
                        as: 'rety',
                        model: SequelizeResourceType
                    },
                    {
                        as: 'remo',
                        model: SequelizeResourceModule
                    }
                ],
                transaction: options?.transaction
            });
            if (!permissions) {
                throw new Error(`No hay permisos`);
            }
            return permissions.map(p => p.get({ plain: true }));
        } catch (error: any) {
            console.error('Error en getPermissions:', error.message);
            throw error;
        }
    }

    async findPermissionById(per_uuid: string, options?: { transaction?: any }): Promise<PermissionEntity | null> {
        try {
            const permission = await SequelizePermission.findOne({ 
                where: { 
                    per_uuid: per_uuid ?? null
                },
                include: [
                    {
                        as: 'rety',
                        model: SequelizeResourceType
                    },
                    {
                        as: 'remo',
                        model: SequelizeResourceModule
                    }
                ],
                transaction: options?.transaction
            });
            if (!permission) {
                return null;
            }
            return permission.get({ plain: true });
        } catch (error: any) {
            console.error('Error en findPermissionById:', error.message);
            throw error;
        }
    }

    async createPermission(permission: PermissionEntity, options?: { transaction?: any }): Promise<PermissionEntity | null> {
        try {
            let { per_uuid, per_slug, per_description, rety_uuid, remo_uuid, per_createdat, per_updatedat } = permission;
            const result = await SequelizePermission.create(
                { per_uuid, per_slug, per_description, rety_uuid, remo_uuid, per_createdat, per_updatedat },
                { transaction: options?.transaction }
            );
            if (!result) {
                throw new Error(`No se ha agregado el permiso`);
            }
            return result.get({ plain: true }) as PermissionEntity;
        } catch (error: any) {
            console.error('Error en createPermission:', error.message);
            throw error;
        }
    }

    async updatePermission(per_uuid: string, permission: PermissionUpdateData, options?: { transaction?: any }): Promise<PermissionEntity | null> {
        try {
            const [updatedCount, [updatedPermission]] = await SequelizePermission.update(
                { 
                    per_slug: permission.per_slug, 
                    per_description: permission.per_description, 
                    rety_uuid: permission.rety_uuid, 
                    remo_uuid: permission.remo_uuid
                },
                { 
                    where: { per_uuid },
                    returning: true,
                    transaction: options?.transaction
                }
            );
            if (updatedCount === 0 || !updatedPermission) {
                throw new Error(`No se ha actualizado el permiso`);
            }
            return updatedPermission.get({ plain: true }) as PermissionEntity;
        } catch (error: any) {
            console.error('Error en updatePermission:', error.message);
            throw error;
        }
    }

    async deletePermission(per_uuid: string, options?: { transaction?: any }): Promise<PermissionEntity | null> {
        try {
            const permission = await this.findPermissionById(per_uuid, options);
            const result = await SequelizePermission.destroy({ 
                where: { per_uuid },
                transaction: options?.transaction
            });
            if (!result) {
                throw new Error(`No se ha eliminado el permiso`);
            }
            return permission;
        } catch (error: any) {
            console.error('Error en deletePermission:', error.message);
            throw error;
        }
    }

    async findPermissionBySlug(per_slug: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<PermissionEntity | null> {
        try {
            const whereCondition: any = { 
                per_slug: per_slug ?? null
            };
            if (excludeUuid) {
                whereCondition.per_uuid = { [Op.ne]: excludeUuid };
            }
            const permission = await SequelizePermission.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });
            return permission ? permission.get({ plain: true }) : null;
        } catch (error: any) {
            console.error('Error en findPermissionBySlug:', error.message);
            throw error;
        }
    }
}
