import { ResourceTypeCreateInput, ResourceTypeUpdateData } from "../../domain/resource-type/resource-type.entity";
import { ResourceTypeRepository } from "../../domain/resource-type/resource-type.repository";
import { ResourceTypeValue } from "../../domain/resource-type/resource-type.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ResourceTypeUseCase {
    constructor(
        private readonly resourceTypeRepository: ResourceTypeRepository
    ) {
        this.getResourceTypes = this.getResourceTypes.bind(this);
        this.getDetailResourceType = this.getDetailResourceType.bind(this);
        this.createResourceType = this.createResourceType.bind(this);
        this.updateResourceType = this.updateResourceType.bind(this);
        this.deleteResourceType = this.deleteResourceType.bind(this);
        this.findResourceTypeByName = this.findResourceTypeByName.bind(this);
    }

    public async getResourceTypes(options?: { transaction?: any }) {
        try {
            const resourceTypes = await this.resourceTypeRepository.getResourceTypes(options);
            if (!resourceTypes) {
                return [];
            }
            return resourceTypes.map(resourceType => ({
                rety_uuid: resourceType.rety_uuid,
                rety_name: resourceType.rety_name,
                rety_description: resourceType.rety_description,
                rety_createdat: resourceType.rety_createdat ? TimezoneConverter.toIsoStringInTimezone(resourceType.rety_createdat, 'America/Buenos_Aires') : undefined,
                rety_updatedat: resourceType.rety_updatedat ? TimezoneConverter.toIsoStringInTimezone(resourceType.rety_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getResourceTypes (use case):', error.message);
            throw error;
        }
    }

    public async getDetailResourceType(rety_uuid: string, options?: { transaction?: any }) {
        try {
            const resourceType = await this.resourceTypeRepository.findResourceTypeById(rety_uuid, options);
            if (!resourceType) {
                throw new Error(`No hay tipo de recurso con el Id: ${rety_uuid}`);
            }
            return {
                rety_uuid: resourceType.rety_uuid,
                rety_name: resourceType.rety_name,
                rety_description: resourceType.rety_description,
                rety_createdat: resourceType.rety_createdat ? TimezoneConverter.toIsoStringInTimezone(resourceType.rety_createdat, 'America/Buenos_Aires') : undefined,
                rety_updatedat: resourceType.rety_updatedat ? TimezoneConverter.toIsoStringInTimezone(resourceType.rety_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en getDetailResourceType (use case):', error.message);
            throw error;
        }
    }
    
    public async createResourceType(input: ResourceTypeCreateInput, options?: { transaction?: any }) {
        try {
            if (!input.rety_name || input.rety_name.trim() === '') {
                throw new Error('Debe proporcionar un Nombre para el tipo de recurso.');
            }

            const existing = await this.resourceTypeRepository.findResourceTypeByName(input.rety_name.trim(), null, options);
            if (existing) {
                throw new Error(`El nombre ${input.rety_name} de tipo de recurso ya existe.`);
            }

            const resourceTypeValue = new ResourceTypeValue({
                rety_uuid: input.rety_uuid,
                rety_name: input.rety_name.trim(),
                rety_description: input.rety_description
            });

            const resourceTypeCreated = await this.resourceTypeRepository.createResourceType(resourceTypeValue, options);
            if (!resourceTypeCreated) {
                throw new Error('No se pudo insertar el tipo de recurso.');
            }

            return {
                rety_uuid: resourceTypeCreated.rety_uuid,
                rety_name: resourceTypeCreated.rety_name,
                rety_description: resourceTypeCreated.rety_description,
                rety_createdat: resourceTypeCreated.rety_createdat ? TimezoneConverter.toIsoStringInTimezone(resourceTypeCreated.rety_createdat, 'America/Buenos_Aires') : undefined,
                rety_updatedat: resourceTypeCreated.rety_updatedat ? TimezoneConverter.toIsoStringInTimezone(resourceTypeCreated.rety_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createResourceType (use case):', error.message);
            throw error;
        }
    }

    public async updateResourceType(rety_uuid: string, update: ResourceTypeUpdateData, options?: { transaction?: any }) {
        try {
            if (update.rety_name && update.rety_name.trim() !== '') {
                const existing = await this.resourceTypeRepository.findResourceTypeByName(update.rety_name.trim(), rety_uuid, options);
                if (existing) {
                    throw new Error(`El nombre ${update.rety_name} de tipo de recurso ya existe.`);
                }
            }

            const resourceTypeUpdated = await this.resourceTypeRepository.updateResourceType(rety_uuid, update, options);
            if (!resourceTypeUpdated) {
                throw new Error(`No se pudo actualizar el tipo de recurso con ID ${rety_uuid}.`);
            }

            return {
                rety_uuid: resourceTypeUpdated.rety_uuid,
                rety_name: resourceTypeUpdated.rety_name,
                rety_description: resourceTypeUpdated.rety_description,
                rety_createdat: resourceTypeUpdated.rety_createdat ? TimezoneConverter.toIsoStringInTimezone(resourceTypeUpdated.rety_createdat, 'America/Buenos_Aires') : undefined,
                rety_updatedat: resourceTypeUpdated.rety_updatedat ? TimezoneConverter.toIsoStringInTimezone(resourceTypeUpdated.rety_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateResourceType (use case):', error.message);
            throw error;
        }
    }

    public async deleteResourceType(rety_uuid: string, options?: { transaction?: any }) {
        try {
            const resourceTypeDeleted = await this.resourceTypeRepository.deleteResourceType(rety_uuid, options);
            if (!resourceTypeDeleted) {
                throw new Error(`No se pudo eliminar el tipo de recurso con ID ${rety_uuid}.`);
            }
            return {
                rety_uuid: resourceTypeDeleted.rety_uuid,
                rety_name: resourceTypeDeleted.rety_name,
                rety_description: resourceTypeDeleted.rety_description,
                rety_createdat: resourceTypeDeleted.rety_createdat ? TimezoneConverter.toIsoStringInTimezone(resourceTypeDeleted.rety_createdat, 'America/Buenos_Aires') : undefined,
                rety_updatedat: resourceTypeDeleted.rety_updatedat ? TimezoneConverter.toIsoStringInTimezone(resourceTypeDeleted.rety_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteResourceType (use case):', error.message);
            throw error;
        }
    }

    public async findResourceTypeByName(rety_name: string, excludeUuid?: string | null, options?: { transaction?: any }) {
        try {
            return await this.resourceTypeRepository.findResourceTypeByName(rety_name, excludeUuid, options);
        } catch (error: any) {
            console.error('Error en findResourceTypeByName (use case):', error.message);
            throw error;
        }
    }
}
