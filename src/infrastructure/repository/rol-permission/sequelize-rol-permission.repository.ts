import { sequelize } from '../../db/sequelize';
import { RolPermissionEntity, RolPermissionCreateInput } from '../../../domain/rol-permission/rol-permission.entity';
import { RolPermissionRepository } from '../../../domain/rol-permission/rol-permission.repository';
import { RolPermissionValue } from '../../../domain/rol-permission/rol-permission.value';
import { SequelizeRolPermission } from '../../model/rol-permission/rol-permission.model';
import { SequelizeRol } from '../../model/rol/rol.model';
import { SequelizePermission } from '../../model/permission/permission.model';

export class SequelizeRolPermissionRepository implements RolPermissionRepository {
    async getRolPermissions(options?: { transaction?: any }): Promise<RolPermissionEntity[] | null> {
        try {
            const list = await SequelizeRolPermission.findAll({
                transaction: options?.transaction,
                include: [
                    { model: SequelizeRol, as: 'rol' },
                    { model: SequelizePermission, as: 'per' }
                ]
            });
            return list.map(item => item.get({ plain: true }) as RolPermissionEntity);
        } catch (error: any) {
            console.error('Error en getRolPermissions:', error.message);
            throw error;
        }
    }

    async findRolPermissionById(rol_uuid: string, per_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity | null> {
        try {
            const item = await SequelizeRolPermission.findOne({
                where: { rol_uuid, per_uuid },
                transaction: options?.transaction,
                include: [
                    { model: SequelizeRol, as: 'rol' },
                    { model: SequelizePermission, as: 'per' }
                ]
            });
            if (!item) {
                return null;
            }
            return item.get({ plain: true }) as RolPermissionEntity;
        } catch (error: any) {
            console.error('Error en findRolPermissionById:', error.message);
            throw error;
        }
    }

    async createRolPermission(data: RolPermissionCreateInput, options?: { transaction?: any }): Promise<RolPermissionEntity | null> {
        try {
            const val = new RolPermissionValue(data);
            const created = await SequelizeRolPermission.create({
                rol_uuid: val.rol_uuid,
                per_uuid: val.per_uuid,
                rolper_createdat: val.rolper_createdat,
                rolper_updatedat: val.rolper_updatedat
            }, {
                transaction: options?.transaction
            });

            return await this.findRolPermissionById(created.rol_uuid, created.per_uuid, options);
        } catch (error: any) {
            console.error('Error en createRolPermission:', error.message);
            throw error;
        }
    }

    async deleteRolPermission(rol_uuid: string, per_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity | null> {
        try {
            const existing = await this.findRolPermissionById(rol_uuid, per_uuid, options);
            if (!existing) {
                return null;
            }

            await SequelizeRolPermission.destroy({
                where: { rol_uuid, per_uuid },
                transaction: options?.transaction
            });

            return existing;
        } catch (error: any) {
            console.error('Error en deleteRolPermission:', error.message);
            throw error;
        }
    }

    async getRolPermissionsByRol(rol_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity[] | null> {
        try {
            const list = await SequelizeRolPermission.findAll({
                where: { rol_uuid },
                transaction: options?.transaction,
                include: [
                    { model: SequelizePermission, as: 'per' }
                ]
            });
            return list.map(item => item.get({ plain: true }) as RolPermissionEntity);
        } catch (error: any) {
            console.error('Error en getRolPermissionsByRol:', error.message);
            throw error;
        }
    }

    async getRolPermissionsByPermission(per_uuid: string, options?: { transaction?: any }): Promise<RolPermissionEntity[] | null> {
        try {
            const list = await SequelizeRolPermission.findAll({
                where: { per_uuid },
                transaction: options?.transaction,
                include: [
                    { model: SequelizeRol, as: 'rol' }
                ]
            });
            return list.map(item => item.get({ plain: true }) as RolPermissionEntity);
        } catch (error: any) {
            console.error('Error en getRolPermissionsByPermission:', error.message);
            throw error;
        }
    }

    async syncPermissionsToRol(rol_uuid: string, per_uuids: string[], options?: { transaction?: any }): Promise<RolPermissionEntity[] | null> {
        const isLocalTx = !options?.transaction;
        const transaction = options?.transaction || await sequelize.transaction();

        try {
            await SequelizeRolPermission.destroy({
                where: { rol_uuid },
                transaction
            });

            for (const per_uuid of per_uuids) {
                const val = new RolPermissionValue({ rol_uuid, per_uuid });
                await SequelizeRolPermission.create({
                    rol_uuid: val.rol_uuid,
                    per_uuid: val.per_uuid,
                    rolper_createdat: val.rolper_createdat,
                    rolper_updatedat: val.rolper_updatedat
                }, { transaction });
            }

            if (isLocalTx) {
                await transaction.commit();
            }

            return await this.getRolPermissionsByRol(rol_uuid, { transaction: isLocalTx ? undefined : transaction });
        } catch (error: any) {
            if (isLocalTx) {
                await transaction.rollback();
            }
            console.error('Error en syncPermissionsToRol:', error.message);
            throw error;
        }
    }
}
