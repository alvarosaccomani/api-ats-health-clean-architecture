import { ResourceTypeEntity, ResourceTypeCreateInput, ResourceTypeUpdateData } from "./resource-type.entity";

export interface ResourceTypeRepository {
    getResourceTypes(options?: { transaction?: any }): Promise<ResourceTypeEntity[] | null>;
    findResourceTypeById(rety_uuid: string, options?: { transaction?: any }): Promise<ResourceTypeEntity | null>;
    createResourceType(resourceType: ResourceTypeCreateInput, options?: { transaction?: any }): Promise<ResourceTypeEntity | null>;
    updateResourceType(rety_uuid: string, resourceType: ResourceTypeUpdateData, options?: { transaction?: any }): Promise<ResourceTypeEntity | null>;
    deleteResourceType(rety_uuid: string, options?: { transaction?: any }): Promise<ResourceTypeEntity | null>;
    findResourceTypeByName(rety_name: string, excludeUuid?: string | null, options?: { transaction?: any }): Promise<ResourceTypeEntity | null>;
}
