import { Op } from "sequelize";
import { RolEntity, RolUpdateData } from "../../../domain/rol/rol.entity";
import { RolRepository } from "../../../domain/rol/rol.repository";
import { SequelizeRol } from "../../model/rol/rol.model";

export class SequelizeRepository implements RolRepository {
    async getRoles(options?: { transaction?: any }): Promise<RolEntity[] | null> {
        try {
            const roles = await SequelizeRol.findAll({
                transaction: options?.transaction
            });
            if (!roles) {
                throw new Error(`No hay roles`);
            }
            return roles.map(r => r.get({ plain: true }));
        } catch (error: any) {
            console.error('Error en getRoles:', error.message);
            throw error;
        }
    }

    async findRolById(rol_uuid: string, options?: { transaction?: any }): Promise<RolEntity | null> {
        try {
            const rol = await SequelizeRol.findOne({ 
                where: { 
                    rol_uuid: rol_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!rol) {
                return null;
            }
            return rol.get({ plain: true });
        } catch (error: any) {
            console.error('Error en findRolById:', error.message);
            throw error;
        }
    }

    async createRol(rol: RolEntity, options?: { transaction?: any }): Promise<RolEntity | null> {
        try {
            let { rol_uuid, rol_name, rol_createdat, rol_updatedat } = rol;
            const result = await SequelizeRol.create(
                { rol_uuid, rol_name, rol_createdat, rol_updatedat },
                { transaction: options?.transaction }
            );
            if (!result) {
                throw new Error(`No se ha agregado el rol`);
            }
            return result.get({ plain: true }) as RolEntity;
        } catch (error: any) {
            console.error('Error en createRol:', error.message);
            throw error;
        }
    }

    async updateRol(rol_uuid: string, rol: RolUpdateData, options?: { transaction?: any }): Promise<RolEntity | null> {
        try {
            const [updatedCount, [updatedRol]] = await SequelizeRol.update(
                {
                    rol_name: rol.rol_name
                },
                {
                    where: { rol_uuid },
                    returning: true,
                    transaction: options?.transaction
                }
            );
            if (updatedCount === 0 || !updatedRol) {
                throw new Error(`No se ha actualizado el rol`);
            }
            return updatedRol.get({ plain: true }) as RolEntity;
        } catch (error: any) {
            console.error('Error en updateRol:', error.message);
            throw error;
        }
    }

    async deleteRol(rol_uuid: string, options?: { transaction?: any }): Promise<RolEntity | null> {
        try {
            const rol = await this.findRolById(rol_uuid, options);
            const result = await SequelizeRol.destroy({ 
                where: { rol_uuid },
                transaction: options?.transaction
            });
            if (!result) {
                throw new Error(`No se ha eliminado el rol`);
            }
            return rol;
        } catch (error: any) {
            console.error('Error en deleteRol:', error.message);
            throw error;
        }
    }

    async findRolByName(rol_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<RolEntity | null> {
        try {
            const whereCondition: any = { rol_name: rol_name ?? null };
            if (excludeUuid) {
                whereCondition.rol_uuid = { [Op.ne]: excludeUuid };
            }
            const rol = await SequelizeRol.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });
            return rol ? rol.get({ plain: true }) : null;
        } catch (error: any) {
            console.error('Error en findRolByName:', error.message);
            throw error;
        }
    }
}
