import { Op } from "sequelize";
import { ResourceTypeEntity, ResourceTypeCreateInput, ResourceTypeUpdateData } from "../../../domain/resource-type/resource-type.entity";
import { ResourceTypeRepository } from "../../../domain/resource-type/resource-type.repository";
import { SequelizeResourceType } from "../../model/resource-type/resource-type.model";

export class SequelizeResourceTypeRepository implements ResourceTypeRepository {
    async getResourceTypes(options?: { transaction?: any }): Promise<ResourceTypeEntity[] | null> {
        try {
            const resourceTypes = await SequelizeResourceType.findAll({
                transaction: options?.transaction
            });
            return resourceTypes.map(rt => rt.get({ plain: true }) as ResourceTypeEntity);
        } catch (error: any) {
            console.error('Error en getResourceTypes:', error.message);
            throw error;
        }
    }

    async findResourceTypeById(rety_uuid: string, options?: { transaction?: any }): Promise<ResourceTypeEntity | null> {
        try {
            const resourceType = await SequelizeResourceType.findOne({ 
                where: { rety_uuid },
                transaction: options?.transaction
            });
            if (!resourceType) {
                return null;
            }
            return resourceType.get({ plain: true }) as ResourceTypeEntity;
        } catch (error: any) {
            console.error('Error en findResourceTypeById:', error.message);
            throw error;
        }
    }

    async createResourceType(resourceType: ResourceTypeCreateInput, options?: { transaction?: any }): Promise<ResourceTypeEntity | null> {
        try {
            const result = await SequelizeResourceType.create({
                rety_uuid: resourceType.rety_uuid!,
                rety_name: resourceType.rety_name,
                rety_description: resourceType.rety_description ?? null
            }, {
                transaction: options?.transaction
            });

            return result.get({ plain: true }) as ResourceTypeEntity;
        } catch (error: any) {
            console.error('Error en createResourceType:', error.message);
            throw error;
        }
    }

    async updateResourceType(rety_uuid: string, resourceType: ResourceTypeUpdateData, options?: { transaction?: any }): Promise<ResourceTypeEntity | null> {
        try {
            const existing = await SequelizeResourceType.findOne({
                where: { rety_uuid },
                transaction: options?.transaction
            });

            if (!existing) {
                return null;
            }

            await existing.update({
                rety_name: resourceType.rety_name ?? existing.rety_name,
                rety_description: resourceType.rety_description !== undefined ? resourceType.rety_description : existing.rety_description
            }, {
                transaction: options?.transaction
            });

            return existing.get({ plain: true }) as ResourceTypeEntity;
        } catch (error: any) {
            console.error('Error en updateResourceType:', error.message);
            throw error;
        }
    }

    async deleteResourceType(rety_uuid: string, options?: { transaction?: any }): Promise<ResourceTypeEntity | null> {
        try {
            const resourceType = await this.findResourceTypeById(rety_uuid, options);
            if (!resourceType) {
                return null;
            }

            await SequelizeResourceType.destroy({
                where: { rety_uuid },
                transaction: options?.transaction
            });

            return resourceType;
        } catch (error: any) {
            console.error('Error en deleteResourceType:', error.message);
            throw error;
        }
    }

    async findResourceTypeByName(rety_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<ResourceTypeEntity | null> {
        try {
            const whereCondition: any = { rety_name };
            if (excludeUuid) {
                whereCondition.rety_uuid = { [Op.ne]: excludeUuid };    
            }

            const resourceType = await SequelizeResourceType.findOne({ 
                where: whereCondition,
                transaction: options?.transaction
            });

            if (!resourceType) {
                return null;
            }

            return resourceType.get({ plain: true }) as ResourceTypeEntity;
        } catch (error: any) {
            console.error('Error en findResourceTypeByName:', error.message);
            throw error;
        }
    }
}
