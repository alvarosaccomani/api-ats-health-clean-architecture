import { Op } from "sequelize";
import { ResourceModuleEntity, ResourceModuleUpdateData } from "../../../domain/resource-module/resource-module.entity";
import { ResourceModuleRepository } from "../../../domain/resource-module/resource-module.repository";
import { SequelizeResourceModule } from "../../model/resource-module/resource-module.model";

export class SequelizeRepository implements ResourceModuleRepository {
    async getResourceModules(options?: { transaction?: any }): Promise<ResourceModuleEntity[] | null> {
        try {
            const resourceModules = await SequelizeResourceModule.findAll({
                transaction: options?.transaction
            });
            if (!resourceModules) {
                throw new Error(`No hay módulos de recurso`);
            }
            return resourceModules.map(r => r.get({ plain: true }));
        } catch (error: any) {
            console.error('Error en getResourceModules:', error.message);
            throw error;
        }
    }

    async findResourceModuleById(remo_uuid: string, options?: { transaction?: any }): Promise<ResourceModuleEntity | null> {
        try {
            const resourceModule = await SequelizeResourceModule.findOne({ 
                where: { 
                    remo_uuid: remo_uuid ?? null
                },
                transaction: options?.transaction
            });
            if (!resourceModule) {
                return null;
            }
            return resourceModule.get({ plain: true });
        } catch (error: any) {
            console.error('Error en findResourceModuleById:', error.message);
            throw error;
        }
    }

    async createResourceModule(resourceModule: ResourceModuleEntity, options?: { transaction?: any }): Promise<ResourceModuleEntity | null> {
        try {
            let { remo_uuid, remo_name, remo_description, remo_createdat, remo_updatedat } = resourceModule;
            const result = await SequelizeResourceModule.create(
                { remo_uuid, remo_name, remo_description, remo_createdat, remo_updatedat },
                { transaction: options?.transaction }
            );
            if (!result) {
                throw new Error(`No se ha agregado el módulo de recurso`);
            }
            return result.get({ plain: true }) as ResourceModuleEntity;
        } catch (error: any) {
            console.error('Error en createResourceModule:', error.message);
            throw error;
        }
    }

    async updateResourceModule(remo_uuid: string, resourceModule: ResourceModuleUpdateData, options?: { transaction?: any }): Promise<ResourceModuleEntity | null> {
        try {
            const [updatedCount, [updatedResourceModule]] = await SequelizeResourceModule.update(
                { 
                    remo_name: resourceModule.remo_name,
                    remo_description: resourceModule.remo_description
                }, 
                { 
                    where: { remo_uuid },
                    returning: true,
                    transaction: options?.transaction
                }
            );
            if (updatedCount === 0 || !updatedResourceModule) {
                throw new Error(`No se ha actualizado el módulo de recurso`);
            }
            return updatedResourceModule.get({ plain: true }) as ResourceModuleEntity;
        } catch (error: any) {
            console.error('Error en updateResourceModule:', error.message);
            throw error;
        }
    }

    async deleteResourceModule(remo_uuid: string, options?: { transaction?: any }): Promise<ResourceModuleEntity | null> {
        try {
            const resourceModule = await this.findResourceModuleById(remo_uuid, options);
            const result = await SequelizeResourceModule.destroy({ 
                where: { remo_uuid },
                transaction: options?.transaction
            });
            if (!result) {
                throw new Error(`No se ha eliminado el módulo de recurso`);
            }
            return resourceModule;
        } catch (error: any) {
            console.error('Error en deleteResourceModule:', error.message);
            throw error;
        }
    }

    async findResourceModuleByName(remo_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<ResourceModuleEntity | null> {
        try {
            const whereCondition: any = { remo_name: remo_name ?? null };
            if (excludeUuid) {
                whereCondition.remo_uuid = { [Op.ne]: excludeUuid };
            }
            const resourceModule = await SequelizeResourceModule.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });
            return resourceModule ? resourceModule.get({ plain: true }) : null;
        } catch (error: any) {
            console.error('Error en findResourceModuleByName:', error.message);
            throw error;
        }
    }
}
